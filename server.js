const express = require("express");
const crypto = require("crypto");
const fs = require("fs-extra");
const path = require("path");
const { spawn } = require("child_process");
const archiver = require("archiver");
const ffmpegPath = require("ffmpeg-static");
const { chromium } = require("playwright");

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const RENDERS_DIR = path.join(ROOT, "renders");

const app = express();
const renderJobs = new Map();

app.use(express.json({ limit: "10mb" }));
app.use(express.static(PUBLIC_DIR));
app.use("/renders", express.static(RENDERS_DIR));

app.post("/api/render", async (req, res) => {
  const { markup, width, height, duration, fps, format, fullPage } = req.body || {};
  const options = normalizeRenderOptions({ width, height, duration, fps, format, fullPage });

  if (!markup || typeof markup !== "string") {
    return res.status(400).json({ error: "Paste or load some HTML/SVG before rendering." });
  }

  const jobId = new Date().toISOString().replace(/[:.]/g, "-");

  try {
    res.json(await renderToOutput({ jobId, markup, options }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Render failed." });
  }
});

app.post("/api/render/start", (req, res) => {
  const { markup, width, height, duration, fps, format, fullPage } = req.body || {};
  const options = normalizeRenderOptions({ width, height, duration, fps, format, fullPage });

  if (!markup || typeof markup !== "string") {
    return res.status(400).json({ error: "Paste or load some HTML/SVG before rendering." });
  }

  const jobId = crypto.randomUUID();
  const job = {
    id: jobId,
    status: "queued",
    progress: 0,
    message: "Queued",
    result: null,
    error: null
  };

  renderJobs.set(jobId, job);
  res.json({ jobId, width: options.width, height: options.height });

  runRenderJob({ jobId, markup, options }).catch((error) => {
    updateJob(jobId, {
      status: "failed",
      progress: 100,
      message: "Render failed",
      error: error.message || "Render failed."
    });
    console.error(error);
  });
});

app.post("/api/capture-frame", async (req, res) => {
  const { markup, width, height, currentTimeMs } = req.body || {};
  const options = normalizeRenderOptions({ width, height, duration: 0.1, fps: 1, format: "image" });

  if (!markup || typeof markup !== "string") {
    return res.status(400).json({ error: "Paste or load some HTML/SVG before capturing." });
  }

  try {
    const buffer = await captureFrameBuffer({
      markup,
      width: options.width,
      height: options.height,
      currentTimeMs: Math.max(0, Math.round(Number(currentTimeMs) || 0))
    });

    res.json({
      dataUrl: `data:image/png;base64,${buffer.toString("base64")}`,
      width: options.width,
      height: options.height
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Frame capture failed." });
  }
});

app.get("/api/render/progress/:jobId", (req, res) => {
  const job = renderJobs.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: "Render job not found." });
  }

  res.json(job);
});

if (require.main === module) {
  startServer(process.env.PORT || 3000).then(({ url }) => {
    console.log(`MotionKing is running at ${url}`);
  });
}

async function runRenderJob({ jobId, markup, options }) {
  updateJob(jobId, { status: "running", progress: 1, message: "Preparing render" });
  const result = await renderToOutput({
    jobId,
    markup,
    options,
    onProgress: (progress, message) => updateJob(jobId, { progress, message })
  });

  updateJob(jobId, {
    status: "completed",
    progress: 100,
    message: "Render complete",
    result
  });

  setTimeout(() => renderJobs.delete(jobId), 30 * 60 * 1000);
}

async function renderToOutput({ jobId, markup, options, onProgress = () => {} }) {
  const safeJobId = jobId.replace(/[^a-zA-Z0-9-]/g, "-");
  const jobDir = path.join(RENDERS_DIR, safeJobId);
  const framesDir = path.join(jobDir, "frames");

  await fs.ensureDir(framesDir);
  await captureFrames({
    markup,
    width: options.width,
    height: options.height,
    duration: options.format === "image" ? 1 / options.fps : options.duration,
    fps: options.fps,
    fullPage: options.fullPage,
    framesDir,
    onProgress
  });

  if (options.format === "image") {
    onProgress(96, "Finalizing PNG image");
    const imagePath = path.join(jobDir, "render.png");
    await fs.copy(path.join(framesDir, "frame-00001.png"), imagePath);

    return {
      type: "image",
      url: `/renders/${safeJobId}/render.png`,
      frames: 1,
      width: options.width,
      height: options.height,
      duration: options.duration,
      fps: options.fps
    };
  }

  if (options.format === "sequence") {
    onProgress(92, "Packaging PNG sequence");
    const zipPath = path.join(jobDir, "frames.zip");
    await zipDirectory(framesDir, zipPath);
    onProgress(98, "Finalizing");

    return {
      type: "sequence",
      url: `/renders/${safeJobId}/frames.zip`,
      frames: Math.ceil(options.duration * options.fps),
      width: options.width,
      height: options.height,
      duration: options.duration,
      fps: options.fps
    };
  }

  onProgress(90, "Encoding MP4");
  const videoPath = path.join(jobDir, "render.mp4");
  await encodeVideo({ framesDir, fps: options.fps, videoPath });
  onProgress(98, "Finalizing");

  return {
    type: "video",
    url: `/renders/${safeJobId}/render.mp4`,
    width: options.width,
    height: options.height,
    duration: options.duration,
    fps: options.fps
  };
}

function updateJob(jobId, patch) {
  const job = renderJobs.get(jobId);
  if (!job) return;
  Object.assign(job, patch);
}

function startServer(port = 0) {
  fs.ensureDirSync(RENDERS_DIR);

  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      const address = server.address();
      const resolvedPort = typeof address === "object" && address ? address.port : port;
      resolve({
        app,
        server,
        port: resolvedPort,
        url: `http://127.0.0.1:${resolvedPort}`
      });
    });

    server.on("error", reject);
  });
}

function normalizeRenderOptions(input) {
  const safeNumber = (value, fallback, min, max) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(Math.max(parsed, min), max);
  };

  const normalizedFormat = ["image", "sequence", "video"].includes(input.format) ? input.format : "video";

  let width = Math.round(safeNumber(input.width, 900, 120, 3840));
  let height = Math.round(safeNumber(input.height, 300, 120, 2160));

  if (normalizedFormat === "video") {
    width = makeEven(width);
    height = makeEven(height);
  }

  return {
    width,
    height,
    duration: safeNumber(input.duration, 8, 0.1, 60),
    fps: Math.round(safeNumber(input.fps, 24, 1, 60)),
    format: normalizedFormat,
    fullPage: input.fullPage === true
  };
}

function makeEven(value) {
  return value % 2 === 0 ? value : value - 1;
}

async function captureFrames({ markup, width, height, duration, fps, fullPage, framesDir, onProgress = () => {} }) {
  const browser = await launchRenderBrowser();
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1
  });

  try {
    await page.setContent(renderDocument(markup, width, height), { waitUntil: "load", timeout: 15000 });
    await page.evaluate(() => document.fonts ? document.fonts.ready : Promise.resolve());

    const frameCount = Math.ceil(duration * fps);

    for (let index = 0; index < frameCount; index += 1) {
      const targetMs = Math.round((index / fps) * 1000);
      await seekAnimationsToTime(page, targetMs);

      await page.screenshot({
        path: path.join(framesDir, `frame-${String(index + 1).padStart(5, "0")}.png`),
        type: "png",
        fullPage
      });

      const frameProgress = Math.round(((index + 1) / frameCount) * 84) + 5;
      onProgress(Math.min(frameProgress, 89), `Captured frame ${index + 1} of ${frameCount}`);
    }
  } finally {
    await browser.close();
  }
}

async function captureFrameBuffer({ markup, width, height, currentTimeMs = 0 }) {
  const browser = await launchRenderBrowser();
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1
  });

  try {
    await page.setContent(renderDocument(markup, width, height), { waitUntil: "load", timeout: 15000 });
    await page.evaluate(() => document.fonts ? document.fonts.ready : Promise.resolve());
    await seekAnimationsToTime(page, currentTimeMs);

    return await page.screenshot({
      type: "png",
      fullPage: false
    });
  } finally {
    await browser.close();
  }
}

async function seekAnimationsToTime(page, currentTimeMs) {
  await page.evaluate(async (time) => {
    const animations = document.getAnimations({ subtree: true });

    for (const animation of animations) {
      if (animation.playState !== "paused") {
        animation.pause();
      }

      animation.currentTime = time;
    }

    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }, currentTimeMs);
}

async function launchRenderBrowser() {
  const launchOptions = {
    headless: true,
    timeout: 30000,
    args: [
      "--no-sandbox",
      "--ignore-gpu-blocklist",
      "--enable-gpu-rasterization",
      "--enable-accelerated-2d-canvas",
      "--disable-dev-shm-usage"
    ]
  };

  try {
    return await chromium.launch(launchOptions);
  } catch (error) {
    const fallbackPath = findInstalledBrowser();
    if (!fallbackPath) {
      throw error;
    }

    return chromium.launch({
      ...launchOptions,
      executablePath: fallbackPath
    });
  }
}

function findInstalledBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function renderDocument(markup, width, height) {
  if (isFullHtmlDocument(markup)) {
    return markup;
  }

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    html,
    body {
      width: ${width}px;
      height: ${height}px;
      margin: 0;
      overflow: hidden;
      background: transparent;
    }

    body {
      display: grid;
      place-items: center;
    }

    body > * {
      max-width: 100%;
      max-height: 100%;
    }
  </style>
</head>
<body>
${markup}
</body>
</html>`;
}

function isFullHtmlDocument(markup) {
  return /<!doctype\s+html/i.test(markup) || /<html[\s>]/i.test(markup);
}

function zipDirectory(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

function encodeVideo({ framesDir, fps, videoPath }) {
  return new Promise((resolve, reject) => {
    if (!ffmpegPath) {
      reject(new Error("FFmpeg is not available. Try rendering an image sequence instead."));
      return;
    }

    const args = [
      "-y",
      "-framerate",
      String(fps),
      "-i",
      path.join(framesDir, "frame-%05d.png"),
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      "-movflags",
      "+faststart",
      videoPath
    ];

    const ffmpeg = spawn(ffmpegPath, args, { windowsHide: true });
    let stderr = "";

    ffmpeg.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    ffmpeg.on("error", reject);
    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(stderr || `FFmpeg exited with code ${code}`));
      }
    });
  });
}

module.exports = {
  app,
  startServer
};
