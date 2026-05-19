const codeInput = document.querySelector("#codeInput");
const previewFrame = document.querySelector("#previewFrame");
const fullPreviewFrame = document.querySelector("#fullPreviewFrame");
const fullView = document.querySelector("#fullView");
const newWindowButton = document.querySelector("#newWindowButton");
const fullViewButton = document.querySelector("#fullViewButton");
const closeFullViewButton = document.querySelector("#closeFullViewButton");
const freezeFullViewButton = document.querySelector("#freezeFullViewButton");
const drawFullViewButton = document.querySelector("#drawFullViewButton");
const refreshFullViewButton = document.querySelector("#refreshFullViewButton");
const toggleConsoleButton = document.querySelector("#toggleConsoleButton");
const fullConsole = document.querySelector("#fullConsole");
const consoleOutput = document.querySelector("#consoleOutput");
const copyConsoleButton = document.querySelector("#copyConsoleButton");
const clearConsoleButton = document.querySelector("#clearConsoleButton");
const fileInput = document.querySelector("#fileInput");
const openFileButton = document.querySelector("#openFileButton");
const themeButton = document.querySelector("#themeButton");
const drawButton = document.querySelector("#drawButton");
const flipbookButton = document.querySelector("#flipbookButton");
const watchButton = document.querySelector("#watchButton");
const refreshButton = document.querySelector("#refreshButton");
const sampleButton = document.querySelector("#sampleButton");
const renderForm = document.querySelector("#renderForm");
const renderButton = document.querySelector("#renderButton");
const statusEl = document.querySelector("#status");
const videoReview = document.querySelector("#videoReview");
const videoReviewMeta = document.querySelector("#videoReviewMeta");
const renderedVideo = document.querySelector("#renderedVideo");
const captureFrameButton = document.querySelector("#captureFrameButton");
const downloadVideoLink = document.querySelector("#downloadVideoLink");
const sizeModeInput = document.querySelector("#sizeModeInput");
const widthInput = document.querySelector("#widthInput");
const heightInput = document.querySelector("#heightInput");
const durationInput = document.querySelector("#durationInput");
const fpsInput = document.querySelector("#fpsInput");
const formatInput = document.querySelector("#formatInput");
const fullPageInput = document.querySelector("#fullPageInput");
const progressWrap = document.querySelector("#progressWrap");
const progressLabel = document.querySelector("#progressLabel");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const drawModal = document.querySelector("#drawModal");
const closeDrawButton = document.querySelector("#closeDrawButton");
const penToolButton = document.querySelector("#penToolButton");
const eraserToolButton = document.querySelector("#eraserToolButton");
const undoDrawButton = document.querySelector("#undoDrawButton");
const redoDrawButton = document.querySelector("#redoDrawButton");
const drawColorInput = document.querySelector("#drawColorInput");
const drawSizeInput = document.querySelector("#drawSizeInput");
const importLayerButton = document.querySelector("#importLayerButton");
const layerFileInput = document.querySelector("#layerFileInput");
const clearDrawButton = document.querySelector("#clearDrawButton");
const copyDrawButton = document.querySelector("#copyDrawButton");
const exportDrawButton = document.querySelector("#exportDrawButton");
const drawCanvas = document.querySelector("#drawCanvas");
const drawStatus = document.querySelector("#drawStatus");
const layersList = document.querySelector("#layersList");
const flipbookModal = document.querySelector("#flipbookModal");
const closeFlipbookButton = document.querySelector("#closeFlipbookButton");
const minimizeFlipbookButton = document.querySelector("#minimizeFlipbookButton");
const flipPrevButton = document.querySelector("#flipPrevButton");
const flipNextButton = document.querySelector("#flipNextButton");
const flipPlayButton = document.querySelector("#flipPlayButton");
const flipFpsInput = document.querySelector("#flipFpsInput");
const flipOnionInput = document.querySelector("#flipOnionInput");
const flipSelectButton = document.querySelector("#flipSelectButton");
const flipPenButton = document.querySelector("#flipPenButton");
const flipEraserButton = document.querySelector("#flipEraserButton");
const flipLineButton = document.querySelector("#flipLineButton");
const flipRectButton = document.querySelector("#flipRectButton");
const flipEllipseButton = document.querySelector("#flipEllipseButton");
const flipTransformButton = document.querySelector("#flipTransformButton");
const flipUndoButton = document.querySelector("#flipUndoButton");
const flipRedoButton = document.querySelector("#flipRedoButton");
const flipColorInput = document.querySelector("#flipColorInput");
const flipSizeInput = document.querySelector("#flipSizeInput");
const flipCopyButton = document.querySelector("#flipCopyButton");
const flipPasteButton = document.querySelector("#flipPasteButton");
const flipScaleDownButton = document.querySelector("#flipScaleDownButton");
const flipScaleUpButton = document.querySelector("#flipScaleUpButton");
const flipAddFrameButton = document.querySelector("#flipAddFrameButton");
const flipDuplicateFrameButton = document.querySelector("#flipDuplicateFrameButton");
const flipDeleteFrameButton = document.querySelector("#flipDeleteFrameButton");
const flipClearFrameButton = document.querySelector("#flipClearFrameButton");
const flipClearAllButton = document.querySelector("#flipClearAllButton");
const flipExportPdfButton = document.querySelector("#flipExportPdfButton");
const flipCanvas = document.querySelector("#flipCanvas");
const flipContext = flipCanvas.getContext("2d");
const flipNoteInput = document.querySelector("#flipNoteInput");
const flipFrameCount = document.querySelector("#flipFrameCount");
const flipFrameStrip = document.querySelector("#flipFrameStrip");
const flipStatus = document.querySelector("#flipStatus");
const drawContext = drawCanvas.getContext("2d");
const strokeCanvas = document.createElement("canvas");
strokeCanvas.width = drawCanvas.width;
strokeCanvas.height = drawCanvas.height;
const strokeContext = strokeCanvas.getContext("2d");

const sampleMarkup = `<svg
  width="900"
  height="300"
  viewBox="0 0 900 300"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffcf4a" stop-opacity="0.72" />
      <stop offset="58%" stop-color="#ffb000" stop-opacity="0.26" />
      <stop offset="100%" stop-color="#05070a" stop-opacity="0" />
    </radialGradient>

    <style>
      .background { fill: #05070a; }

      .glow {
        fill: url(#glow);
        transform-origin: 450px 150px;
        animation: pulse 2s ease-in-out infinite;
      }

      .word {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 92px;
        font-weight: 900;
        letter-spacing: 6px;
        text-anchor: middle;
        dominant-baseline: middle;
        fill: #ffb000;
        filter: blur(0px);
        transform-origin: 450px 150px;
        opacity: 1;
      }

      .word-1 { animation: morphWord 8s infinite both; }
      .word-2 { animation: morphWord 8s infinite both; animation-delay: 2s; }
      .word-3 { animation: morphWord 8s infinite both; animation-delay: 4s; }
      .word-4 { animation: morphWord 8s infinite both; animation-delay: 6s; }

      @keyframes morphWord {
        0% { opacity: 1; filter: blur(0px); transform: scale(1); }
        24% { opacity: 1; filter: blur(0px); transform: scale(1); }
        36% { opacity: 0; filter: blur(22px); transform: scale(1.25); }
        100% { opacity: 0; filter: blur(22px); transform: scale(1.25); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.65; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.08); }
      }
    </style>
  </defs>

  <rect class="background" width="900" height="300" />
  <circle class="glow" cx="450" cy="150" r="180" />
  <text class="word word-1" x="450" y="150">BOUNCE</text>
  <text class="word word-2" x="450" y="150">MORPH</text>
  <text class="word word-3" x="450" y="150">ANIMATE</text>
  <text class="word word-4" x="450" y="150">CREATE</text>
</svg>`;

let previewTimer = 0;
let sizeEditedByUser = false;
let currentFilePath = "";
let currentFileMtime = 0;
let currentFileSize = 0;
let watchTimer = 0;
let watchInFlight = false;
let progressTimer = 0;
let renderedVideoUrl = "";
let fullViewOpenedAt = 0;
let fullViewFrozen = false;
let fullViewLogs = [];
let drawTool = "pen";
let isDrawing = false;
let activeStroke = null;
let drawingStrokes = [];
let drawingLayers = [];
let undoStack = [];
let redoStack = [];
let flipFrames = [createFlipFrame()];
let flipFrameIndex = 0;
let flipTool = "pen";
let flipDrawing = false;
let flipActiveStroke = null;
let flipTransformStart = null;
let flipSelectStart = null;
let flipSelectionRect = null;
let flipSelectionIds = [];
let flipClipboard = [];
let flipDragMode = "";
let flipPlayTimer = 0;
let flipUndoStack = [];
let flipRedoStack = [];

applyTheme(localStorage.getItem("motionking-theme") || "dark");
codeInput.value = sampleMarkup;
updatePreview();
syncRenderSizeFields();
redrawCanvas();
renderLayersList();
redrawFlipCanvas();
renderFlipFrames();

newWindowButton.addEventListener("click", async () => {
  if (window.motionKing && window.motionKing.newWindow) {
    try {
      await window.motionKing.newWindow();
    } catch (error) {
      setStatus(`Could not open a new window: ${error.message}`);
    }
    return;
  }

  window.open(window.location.href, "_blank", "noopener");
});

codeInput.addEventListener("input", () => {
  window.clearTimeout(previewTimer);
  previewTimer = window.setTimeout(() => {
    if (!sizeEditedByUser) inferSizeFromMarkup();
    updatePreview();
  }, 250);
});

refreshButton.addEventListener("click", updatePreview);
captureFrameButton.addEventListener("click", captureRenderedVideoFrame);

themeButton.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

drawButton.addEventListener("click", () => {
  drawModal.hidden = false;
  redrawCanvas();
});

flipbookButton.addEventListener("click", () => {
  flipbookModal.hidden = false;
  redrawFlipCanvas();
  renderFlipFrames();
});

closeDrawButton.addEventListener("click", closeDrawModal);
closeFlipbookButton.addEventListener("click", closeFlipbookModal);
minimizeFlipbookButton.addEventListener("click", minimizeFlipbookModal);

penToolButton.addEventListener("click", () => setDrawTool("pen"));
eraserToolButton.addEventListener("click", () => setDrawTool("eraser"));
undoDrawButton.addEventListener("click", undoDrawing);
redoDrawButton.addEventListener("click", redoDrawing);
importLayerButton.addEventListener("click", () => layerFileInput.click());
layerFileInput.addEventListener("change", importLayerFiles);

document.querySelectorAll(".swatch").forEach((button) => {
  button.addEventListener("click", () => {
    drawColorInput.value = button.dataset.color;
    setDrawTool("pen");
  });
});

clearDrawButton.addEventListener("click", () => {
  saveDrawingState();
  drawingStrokes = [];
  redrawCanvas();
  setDrawStatus("Drawing strokes cleared.");
});

exportDrawButton.addEventListener("click", exportDrawing);
copyDrawButton.addEventListener("click", copyDrawing);

drawCanvas.addEventListener("pointerdown", startDrawing);
drawCanvas.addEventListener("pointermove", continueDrawing);
drawCanvas.addEventListener("pointerup", finishDrawing);
drawCanvas.addEventListener("pointercancel", finishDrawing);
drawCanvas.addEventListener("pointerleave", finishDrawing);

flipPrevButton.addEventListener("click", () => setFlipFrame(flipFrameIndex - 1));
flipNextButton.addEventListener("click", () => setFlipFrame(flipFrameIndex + 1));
flipPlayButton.addEventListener("click", toggleFlipPlayback);
flipFpsInput.addEventListener("change", restartFlipPlaybackIfNeeded);
flipOnionInput.addEventListener("change", redrawFlipCanvas);
flipSelectButton.addEventListener("click", () => setFlipTool("select"));
flipPenButton.addEventListener("click", () => setFlipTool("pen"));
flipEraserButton.addEventListener("click", () => setFlipTool("eraser"));
flipLineButton.addEventListener("click", () => setFlipTool("line"));
flipRectButton.addEventListener("click", () => setFlipTool("rect"));
flipEllipseButton.addEventListener("click", () => setFlipTool("ellipse"));
flipTransformButton.addEventListener("click", () => setFlipTool("transform"));
flipUndoButton.addEventListener("click", undoFlipbook);
flipRedoButton.addEventListener("click", redoFlipbook);
flipCopyButton.addEventListener("click", copyFlipSelection);
flipPasteButton.addEventListener("click", pasteFlipSelection);
flipScaleDownButton.addEventListener("click", () => scaleCurrentFlipFrame(0.9));
flipScaleUpButton.addEventListener("click", () => scaleCurrentFlipFrame(1.1));
flipAddFrameButton.addEventListener("click", addFlipFrame);
flipDuplicateFrameButton.addEventListener("click", duplicateFlipFrame);
flipDeleteFrameButton.addEventListener("click", deleteFlipFrame);
flipClearFrameButton.addEventListener("click", clearFlipFrame);
flipClearAllButton.addEventListener("click", clearAllFlipFrames);
flipExportPdfButton.addEventListener("click", exportFlipbookPdf);
flipNoteInput.addEventListener("input", () => {
  getCurrentFlipFrame().note = flipNoteInput.value;
  renderFlipFrames();
});

flipNoteInput.addEventListener("focus", saveFlipState);

flipCanvas.addEventListener("pointerdown", startFlipDrawing);
flipCanvas.addEventListener("pointermove", continueFlipDrawing);
flipCanvas.addEventListener("pointerup", finishFlipDrawing);
flipCanvas.addEventListener("pointercancel", finishFlipDrawing);
flipCanvas.addEventListener("pointerleave", finishFlipDrawing);

openFileButton.addEventListener("click", async () => {
  if (window.motionKing && window.motionKing.openFile) {
    try {
      const file = await window.motionKing.openFile();
      if (file) {
        loadFileSnapshot(file);
      }
    } catch (error) {
      setStatus(`Could not open file: ${error.message}`);
    }
    return;
  }

  fileInput.click();
});

watchButton.addEventListener("click", () => {
  if (!currentFilePath) return;

  if (watchTimer) {
    stopWatching();
  } else {
    startWatching();
  }
});

fullViewButton.addEventListener("click", () => {
  syncFullView();
  fullView.hidden = false;
  fullViewOpenedAt = performance.now();
});

closeFullViewButton.addEventListener("click", closeFullView);
freezeFullViewButton.addEventListener("click", toggleFullViewFreeze);
drawFullViewButton.addEventListener("click", drawFullViewFrame);
refreshFullViewButton.addEventListener("click", refreshFullView);
toggleConsoleButton.addEventListener("click", toggleFullConsole);
copyConsoleButton.addEventListener("click", copyFullConsole);
clearConsoleButton.addEventListener("click", clearFullConsole);

window.addEventListener("message", handlePreviewMessage);

document.addEventListener("keydown", (event) => {
  if (!flipbookModal.hidden && handleFlipbookShortcut(event)) {
    return;
  }

  if (event.key === "Escape" && !fullView.hidden) {
    closeFullView();
  }

  if (event.key === "Escape" && !drawModal.hidden) {
    closeDrawModal();
  }

  if (event.key === "Escape" && !flipbookModal.hidden) {
    closeFlipbookModal();
  }
});

sampleButton.addEventListener("click", () => {
  stopWatching();
  currentFilePath = "";
  currentFileMtime = 0;
  currentFileSize = 0;
  updateWatchButton();
  codeInput.value = sampleMarkup;
  sizeEditedByUser = false;
  widthInput.value = 900;
  heightInput.value = 300;
  durationInput.value = 8;
  fpsInput.value = 24;
  updatePreview();
});

fileInput.addEventListener("change", async () => {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;

  stopWatching();
  currentFilePath = "";
  currentFileMtime = 0;
  currentFileSize = 0;
  updateWatchButton();
  codeInput.value = await file.text();
  sizeEditedByUser = false;
  inferSizeFromMarkup();
  updatePreview();
  setStatus(`Loaded ${file.name}.`);
  fileInput.value = "";
});

[widthInput, heightInput].forEach((input) => {
  input.addEventListener("input", () => {
    sizeEditedByUser = true;
    sizeModeInput.value = "custom";
    updatePreview();
  });
});

sizeModeInput.addEventListener("change", () => {
  updateSizeControls();
  syncRenderSizeFields();
});

window.addEventListener("resize", () => {
  window.clearTimeout(previewTimer);
  previewTimer = window.setTimeout(syncRenderSizeFields, 150);
});

renderForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    markup: codeInput.value,
    ...getRenderSize(),
    duration: Number(durationInput.value),
    fps: Number(fpsInput.value),
    format: formatInput.value,
    fullPage: fullPageInput.checked
  };

  renderButton.disabled = true;
  renderButton.textContent = "Rendering";
  setProgress(0, "Preparing render");
  progressWrap.hidden = false;
  hideVideoReview();
  setStatus(`Rendering ${payload.width} x ${payload.height}. Short clips usually take a few moments.`);

  try {
    const response = await fetch("/api/render/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const started = await response.json();
    if (!response.ok) {
      throw new Error(started.error || "Render failed.");
    }

    const result = await pollRenderProgress(started.jobId);
    const label = result.type === "sequence" ? "Download PNG sequence" : result.type === "image" ? "Download PNG image" : "Download MP4";
    setProgress(100, "Render complete");
    setStatus(`${label}: <a href="${result.url}" download>${result.url}</a>`);
    if (result.type === "video") {
      showVideoReview(result);
    } else {
      hideVideoReview();
    }
  } catch (error) {
    setStatus(error.message);
    setProgress(100, "Render failed");
    hideVideoReview();
  } finally {
    window.clearInterval(progressTimer);
    progressTimer = 0;
    renderButton.disabled = false;
    renderButton.textContent = "Render";
  }
});

async function pollRenderProgress(jobId) {
  return new Promise((resolve, reject) => {
    progressTimer = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/render/progress/${jobId}`);
        const job = await response.json();
        if (!response.ok) {
          throw new Error(job.error || "Could not read render progress.");
        }

        setProgress(job.progress || 0, job.message || "Rendering");

        if (job.status === "completed") {
          window.clearInterval(progressTimer);
          progressTimer = 0;
          resolve(job.result);
        }

        if (job.status === "failed") {
          window.clearInterval(progressTimer);
          progressTimer = 0;
          reject(new Error(job.error || "Render failed."));
        }
      } catch (error) {
        window.clearInterval(progressTimer);
        progressTimer = 0;
        reject(error);
      }
    }, 500);
  });
}

function setProgress(value, label) {
  const progress = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  progressLabel.textContent = label;
  progressPercent.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;
}

function showVideoReview(result) {
  renderedVideoUrl = result.url;
  renderedVideo.src = result.url;
  renderedVideo.load();
  downloadVideoLink.href = result.url;
  downloadVideoLink.download = result.url.split("/").pop() || "render.mp4";
  videoReviewMeta.textContent = `${result.width} x ${result.height}, ${result.duration}s, ${result.fps} fps`;
  videoReview.hidden = false;
}

function hideVideoReview() {
  renderedVideoUrl = "";
  renderedVideo.removeAttribute("src");
  renderedVideo.load();
  downloadVideoLink.href = "#";
  videoReview.hidden = true;
}

async function captureRenderedVideoFrame() {
  if (!renderedVideoUrl) {
    setStatus("Render a video first, then capture a frame.");
    return;
  }

  if (renderedVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    try {
      await waitForVideoFrame(renderedVideo);
    } catch (error) {
      setStatus(`Could not capture video frame: ${error.message}`);
      return;
    }
  }

  renderedVideo.pause();

  const width = renderedVideo.videoWidth || Number(widthInput.value) || drawCanvas.width;
  const height = renderedVideo.videoHeight || Number(heightInput.value) || drawCanvas.height;
  const frameCanvas = document.createElement("canvas");
  frameCanvas.width = width;
  frameCanvas.height = height;
  frameCanvas.getContext("2d").drawImage(renderedVideo, 0, 0, width, height);

  try {
    const image = await loadImage(frameCanvas.toDataURL("image/png"));
    saveDrawingState();
    setDrawingCanvasSize(width, height);
    drawingLayers = [{
      id: createId(),
      name: `Video frame ${formatVideoTime(renderedVideo.currentTime)}`,
      image,
      width,
      height,
      visible: true,
      opacity: 1
    }];
    drawingStrokes = [];
    renderLayersList();
    redrawCanvas();
    drawModal.hidden = false;
    setDrawTool("pen");
    setDrawStatus(`Captured ${formatVideoTime(renderedVideo.currentTime)}. Draw on the frame, then use Copy PNG.`);
  } catch (error) {
    setStatus(`Could not capture video frame: ${error.message}`);
  }
}

async function toggleFullViewFreeze() {
  if (fullView.hidden) return;

  if (fullViewFrozen) {
    setFullViewFrozen(false);
    postFullViewCommand("unfreeze");
    return;
  }

  setFullViewFrozen(true);
  postFullViewCommand("freeze");
}

async function drawFullViewFrame() {
  if (fullView.hidden) return;

  if (!fullViewFrozen) {
    setFullViewFrozen(true);
    postFullViewCommand("freeze");
    await waitForPaint();
  }

  drawFullViewButton.disabled = true;
  drawFullViewButton.textContent = "Capturing";

  try {
    const dataUrl = window.motionKing && window.motionKing.captureRegion
      ? await captureFullViewWithElectron()
      : await captureFullViewWithServer();

    await openCapturedImageInDrawing(dataUrl, "Full View freeze", "Frozen frame captured. Draw on it, then use Copy PNG or Export PNG.");
  } catch (error) {
    setStatus(`Could not capture Full View: ${error.message}`);
  } finally {
    drawFullViewButton.disabled = false;
    drawFullViewButton.textContent = "Draw";
  }
}

function setFullViewFrozen(frozen) {
  fullViewFrozen = frozen;
  freezeFullViewButton.textContent = frozen ? "Unfreeze" : "Freeze";
  freezeFullViewButton.setAttribute("aria-pressed", frozen ? "true" : "false");
}

function postFullViewCommand(command) {
  if (!fullPreviewFrame.contentWindow) return;
  fullPreviewFrame.contentWindow.postMessage({
    motionKing: true,
    target: "motionking-preview",
    command
  }, "*");
}

function refreshFullView() {
  syncFullView();
  setStatus("Full View refreshed.");
}

function toggleFullConsole() {
  fullConsole.hidden = !fullConsole.hidden;
}

async function copyFullConsole() {
  const text = formatConsoleLogs();
  try {
    await navigator.clipboard.writeText(text || "No Full View console messages.");
    setStatus("Console copied.");
  } catch (error) {
    setStatus(`Could not copy console: ${error.message}`);
  }
}

function clearFullConsole() {
  fullViewLogs = [];
  renderFullConsole();
}

function handlePreviewMessage(event) {
  const data = event.data || {};
  if (data.source !== "motionking-preview" || data.frameId !== "full") return;

  fullViewLogs.push({
    level: data.level || "log",
    args: Array.isArray(data.args) ? data.args : [],
    message: data.message || "",
    time: data.time || new Date().toISOString()
  });

  if (fullViewLogs.length > 300) {
    fullViewLogs = fullViewLogs.slice(-300);
  }

  renderFullConsole();
}

function renderFullConsole() {
  const text = formatConsoleLogs();
  consoleOutput.textContent = text || "No console messages.";
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function formatConsoleLogs() {
  return fullViewLogs.map((entry) => {
    const message = entry.args.length ? entry.args.join(" ") : entry.message;
    return `[${entry.time}] ${entry.level.toUpperCase()} ${message}`;
  }).join("\n");
}

async function captureFullViewWithElectron() {
  const rect = fullPreviewFrame.getBoundingClientRect();
  return window.motionKing.captureRegion({
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  });
}

async function captureFullViewWithServer() {
  const rect = fullPreviewFrame.getBoundingClientRect();
  const elapsedMs = Math.max(0, Math.round(performance.now() - fullViewOpenedAt));
  const response = await fetch("/api/capture-frame", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      markup: codeInput.value,
      width: Math.max(120, Math.round(rect.width)),
      height: Math.max(120, Math.round(rect.height)),
      currentTimeMs: elapsedMs
    })
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "The frame could not be captured.");
  }

  return result.dataUrl;
}

async function openCapturedImageInDrawing(dataUrl, name, message) {
  const image = await loadImage(dataUrl);
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;

  saveDrawingState();
  setDrawingCanvasSize(width, height);
  drawingLayers = [{
    id: createId(),
    name,
    image,
    width,
    height,
    visible: true,
    opacity: 1
  }];
  drawingStrokes = [];
  renderLayersList();
  redrawCanvas();
  drawModal.hidden = false;
  setDrawTool("pen");
  setDrawStatus(message);
}

function waitForPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function setDrawingCanvasSize(width, height) {
  const nextWidth = Math.max(1, Math.round(Number(width) || 1));
  const nextHeight = Math.max(1, Math.round(Number(height) || 1));

  drawCanvas.width = nextWidth;
  drawCanvas.height = nextHeight;
  strokeCanvas.width = nextWidth;
  strokeCanvas.height = nextHeight;
}

function waitForVideoFrame(video) {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("the video frame did not load in time"));
    }, 5000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("seeked", onLoaded);
      video.removeEventListener("error", onError);
    };

    const onLoaded = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error("the video could not be read"));
    };

    video.addEventListener("loadeddata", onLoaded, { once: true });
    video.addEventListener("seeked", onLoaded, { once: true });
    video.addEventListener("error", onError, { once: true });
    video.load();
  });
}

function formatVideoTime(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const wholeSeconds = Math.floor(safeSeconds % 60);
  const centiseconds = Math.floor((safeSeconds % 1) * 100);
  return `${String(minutes).padStart(2, "0")}:${String(wholeSeconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("motionking-theme", theme);
  themeButton.textContent = theme === "dark" ? "Light" : "Dark";
  themeButton.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

function closeDrawModal() {
  drawModal.hidden = true;
}

function closeFlipbookModal() {
  stopFlipPlayback();
  flipbookModal.hidden = true;
}

function minimizeFlipbookModal() {
  stopFlipPlayback();
  flipbookModal.hidden = true;
  setStatus("Flipbook minimized. Use the Flipbook button to reopen it.");
}

function setDrawTool(tool) {
  drawTool = tool;
  penToolButton.setAttribute("aria-pressed", tool === "pen" ? "true" : "false");
  eraserToolButton.setAttribute("aria-pressed", tool === "eraser" ? "true" : "false");
  drawCanvas.style.cursor = tool === "eraser" ? "cell" : "crosshair";
}

function createFlipFrame(strokes = [], note = "") {
  return {
    id: createId(),
    strokes: strokes.map(cloneStroke),
    note
  };
}

function getCurrentFlipFrame() {
  return flipFrames[flipFrameIndex];
}

function setFlipTool(tool) {
  flipTool = tool;
  flipSelectButton.setAttribute("aria-pressed", tool === "select" ? "true" : "false");
  flipPenButton.setAttribute("aria-pressed", tool === "pen" ? "true" : "false");
  flipEraserButton.setAttribute("aria-pressed", tool === "eraser" ? "true" : "false");
  flipLineButton.setAttribute("aria-pressed", tool === "line" ? "true" : "false");
  flipRectButton.setAttribute("aria-pressed", tool === "rect" ? "true" : "false");
  flipEllipseButton.setAttribute("aria-pressed", tool === "ellipse" ? "true" : "false");
  flipTransformButton.setAttribute("aria-pressed", tool === "transform" ? "true" : "false");
  flipCanvas.style.cursor = tool === "transform" || tool === "select" ? "move" : tool === "eraser" ? "cell" : "crosshair";
  redrawFlipCanvas();
}

function setFlipFrame(index) {
  if (flipFrames.length === 0) return;
  flipFrameIndex = Math.max(0, Math.min(flipFrames.length - 1, index));
  flipSelectionIds = [];
  flipSelectionRect = null;
  flipNoteInput.value = getCurrentFlipFrame().note;
  redrawFlipCanvas();
  renderFlipFrames();
}

function addFlipFrame() {
  stopFlipPlayback();
  saveFlipState();
  flipFrames.splice(flipFrameIndex + 1, 0, createFlipFrame());
  setFlipFrame(flipFrameIndex + 1);
  setFlipStatus("Frame added.");
}

function duplicateFlipFrame() {
  stopFlipPlayback();
  saveFlipState();
  const frame = getCurrentFlipFrame();
  flipFrames.splice(flipFrameIndex + 1, 0, createFlipFrame(frame.strokes, frame.note));
  setFlipFrame(flipFrameIndex + 1);
  setFlipStatus("Frame duplicated.");
}

function deleteFlipFrame() {
  stopFlipPlayback();
  saveFlipState();
  if (flipFrames.length === 1) {
    flipFrames = [createFlipFrame()];
    setFlipFrame(0);
    setFlipStatus("Frame cleared.");
    return;
  }

  flipFrames.splice(flipFrameIndex, 1);
  setFlipFrame(Math.min(flipFrameIndex, flipFrames.length - 1));
  setFlipStatus("Frame deleted.");
}

function clearFlipFrame() {
  stopFlipPlayback();
  saveFlipState();
  getCurrentFlipFrame().strokes = [];
  flipSelectionIds = [];
  flipSelectionRect = null;
  redrawFlipCanvas();
  renderFlipFrames();
  setFlipStatus("Current frame cleared.");
}

function clearAllFlipFrames() {
  stopFlipPlayback();
  saveFlipState();
  flipFrames = [createFlipFrame()];
  flipFrameIndex = 0;
  flipSelectionIds = [];
  flipSelectionRect = null;
  flipNoteInput.value = "";
  redrawFlipCanvas();
  renderFlipFrames();
  setFlipStatus("Flipbook reset.");
}

function startFlipDrawing(event) {
  event.preventDefault();
  stopFlipPlayback();
  flipCanvas.setPointerCapture(event.pointerId);
  const point = getFlipCanvasPoint(event);

  if (flipTool === "select") {
    if (isPointInFlipSelection(point)) {
      saveFlipState();
      flipDragMode = "move-selection";
      flipTransformStart = point;
    } else {
      flipDragMode = "select-box";
      flipSelectStart = point;
      flipSelectionRect = makeRectFromPoints(point, point);
      flipSelectionIds = [];
    }
    flipDrawing = true;
    redrawFlipCanvas();
    return;
  }

  if (flipTool === "transform") {
    saveFlipState();
    flipTransformStart = point;
    flipDrawing = true;
    return;
  }

  saveFlipState();
  flipDrawing = true;
  flipActiveStroke = {
    id: createId(),
    tool: flipTool,
    color: flipColorInput.value,
    size: Number(flipSizeInput.value),
    points: [point]
  };
  getCurrentFlipFrame().strokes.push(flipActiveStroke);
  redrawFlipCanvas();
}

function continueFlipDrawing(event) {
  if (!flipDrawing) return;
  event.preventDefault();
  const point = getFlipCanvasPoint(event);

  if (flipTool === "select" && flipDragMode === "select-box" && flipSelectStart) {
    flipSelectionRect = makeRectFromPoints(flipSelectStart, point);
    redrawFlipCanvas();
    return;
  }

  if (flipTool === "select" && flipDragMode === "move-selection" && flipTransformStart) {
    const dx = point.x - flipTransformStart.x;
    const dy = point.y - flipTransformStart.y;
    translateFlipStrokes(getSelectedFlipStrokes(), dx, dy);
    flipTransformStart = point;
    redrawFlipCanvas();
    return;
  }

  if (flipTool === "transform" && flipTransformStart) {
    const dx = point.x - flipTransformStart.x;
    const dy = point.y - flipTransformStart.y;
    const selected = getSelectedFlipStrokes();
    if (selected.length) {
      translateFlipStrokes(selected, dx, dy);
    } else {
      translateFlipFrame(getCurrentFlipFrame(), dx, dy);
    }
    flipTransformStart = point;
    redrawFlipCanvas();
    return;
  }

  if (!flipActiveStroke) return;
  if (isFlipShapeTool(flipActiveStroke.tool)) {
    flipActiveStroke.points[1] = point;
  } else {
    flipActiveStroke.points.push(point);
  }
  redrawFlipCanvas();
}

function finishFlipDrawing(event) {
  if (!flipDrawing) return;
  event.preventDefault();
  if (flipTool === "select" && flipDragMode === "select-box" && flipSelectionRect) {
    flipSelectionIds = getCurrentFlipFrame().strokes
      .filter((stroke) => rectsIntersect(getStrokeBounds(ensureFlipStrokeId(stroke)), flipSelectionRect))
      .map((stroke) => ensureFlipStrokeId(stroke).id);
    setFlipStatus(flipSelectionIds.length ? `${flipSelectionIds.length} item${flipSelectionIds.length === 1 ? "" : "s"} selected.` : "Nothing selected.");
  }
  flipDrawing = false;
  flipTransformStart = null;
  flipSelectStart = null;
  flipDragMode = "";
  flipActiveStroke = null;
  flipSelectionRect = null;
  renderFlipFrames();
  redrawFlipCanvas();
}

function getFlipCanvasPoint(event) {
  const rect = flipCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * flipCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * flipCanvas.height
  };
}

function redrawFlipCanvas() {
  flipContext.save();
  flipContext.fillStyle = "#ffffff";
  flipContext.fillRect(0, 0, flipCanvas.width, flipCanvas.height);

  if (flipOnionInput.checked && flipFrameIndex > 0 && !flipPlayTimer) {
    flipContext.globalAlpha = 0.22;
    drawFlipFrameOnContext(flipContext, flipFrames[flipFrameIndex - 1], flipCanvas.width, flipCanvas.height);
    flipContext.globalAlpha = 1;
  }

  drawFlipFrameOnContext(flipContext, getCurrentFlipFrame(), flipCanvas.width, flipCanvas.height);
  flipContext.restore();
  if (!flipPlayTimer && (flipTool === "transform" || flipTool === "select")) {
    drawFlipBounds();
  }
  if (!flipPlayTimer && flipSelectionRect) {
    drawSelectionRect(flipSelectionRect);
  }
  updateFlipFrameCount();
}

function drawFlipBounds() {
  const selected = getSelectedFlipStrokes();
  const bounds = selected.length ? getFlipStrokesBounds(selected) : getFlipFrameBounds(getCurrentFlipFrame());
  if (!bounds) return;

  flipContext.save();
  flipContext.setLineDash([10, 8]);
  flipContext.lineWidth = 2;
  flipContext.strokeStyle = "#0f8b8d";
  flipContext.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
  flipContext.restore();
}

function drawSelectionRect(rect) {
  flipContext.save();
  flipContext.setLineDash([8, 6]);
  flipContext.lineWidth = 2;
  flipContext.strokeStyle = "#e16a78";
  flipContext.fillStyle = "rgba(225, 106, 120, 0.08)";
  flipContext.fillRect(rect.x, rect.y, rect.width, rect.height);
  flipContext.strokeRect(rect.x, rect.y, rect.width, rect.height);
  flipContext.restore();
}

function drawFlipFrameOnContext(context, frame, width, height) {
  const scratch = document.createElement("canvas");
  scratch.width = width;
  scratch.height = height;
  const scratchContext = scratch.getContext("2d");

  for (const stroke of frame.strokes) {
    drawFlipStroke(scratchContext, stroke);
  }

  context.drawImage(scratch, 0, 0);
}

function drawFlipStroke(context, stroke) {
  const points = stroke.points;
  if (points.length === 0) return;

  context.save();
  context.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over";
  context.strokeStyle = stroke.color;
  context.lineWidth = stroke.size;
  context.lineCap = "round";
  context.lineJoin = "round";

  if (stroke.tool === "line" && points.length > 1) {
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.stroke();
    context.restore();
    return;
  }

  if ((stroke.tool === "rect" || stroke.tool === "ellipse") && points.length > 1) {
    const rect = makeRectFromPoints(points[0], points[1]);
    context.beginPath();
    if (stroke.tool === "ellipse") {
      context.ellipse(rect.x + rect.width / 2, rect.y + rect.height / 2, Math.abs(rect.width / 2), Math.abs(rect.height / 2), 0, 0, Math.PI * 2);
    } else {
      context.rect(rect.x, rect.y, rect.width, rect.height);
    }
    context.stroke();
    context.restore();
    return;
  }

  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  if (points.length === 1) {
    context.lineTo(points[0].x + 0.01, points[0].y + 0.01);
  } else {
    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      const midX = (previous.x + current.x) / 2;
      const midY = (previous.y + current.y) / 2;
      context.quadraticCurveTo(previous.x, previous.y, midX, midY);
    }
  }

  context.stroke();
  context.restore();
}

function renderFlipFrames() {
  flipFrameStrip.innerHTML = "";
  updateFlipFrameCount();

  flipFrames.forEach((frame, index) => {
    const button = document.createElement("button");
    button.className = "flip-frame-button";
    button.type = "button";
    button.setAttribute("aria-pressed", index === flipFrameIndex ? "true" : "false");
    button.addEventListener("click", () => {
      stopFlipPlayback();
      setFlipFrame(index);
    });

    const thumb = document.createElement("img");
    thumb.className = "flip-frame-thumb";
    thumb.alt = `Frame ${index + 1}`;
    thumb.src = createFlipThumbnail(frame);

    const label = document.createElement("span");
    label.className = "flip-frame-label";
    label.textContent = `Frame ${index + 1}${frame.note.trim() ? " - note" : ""}`;

    button.append(thumb, label);
    flipFrameStrip.append(button);
  });
}

function createFlipThumbnail(frame) {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 180;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.scale(canvas.width / flipCanvas.width, canvas.height / flipCanvas.height);
  drawFlipFrameOnContext(context, frame, flipCanvas.width, flipCanvas.height);
  return canvas.toDataURL("image/png");
}

function updateFlipFrameCount() {
  flipFrameCount.textContent = `Frame ${flipFrameIndex + 1} of ${flipFrames.length}`;
  flipPrevButton.disabled = flipFrameIndex === 0;
  flipNextButton.disabled = flipFrameIndex === flipFrames.length - 1;
  flipDeleteFrameButton.disabled = flipFrames.length === 1 && getCurrentFlipFrame().strokes.length === 0 && !getCurrentFlipFrame().note;
  flipUndoButton.disabled = flipUndoStack.length === 0;
  flipRedoButton.disabled = flipRedoStack.length === 0;
  flipCopyButton.disabled = flipSelectionIds.length === 0;
  flipPasteButton.disabled = flipClipboard.length === 0;
}

function translateFlipFrame(frame, dx, dy) {
  translateFlipStrokes(frame.strokes, dx, dy);
}

function translateFlipStrokes(strokes, dx, dy) {
  for (const stroke of strokes) {
    for (const point of stroke.points) {
      point.x += dx;
      point.y += dy;
    }
  }
}

function scaleCurrentFlipFrame(scale) {
  stopFlipPlayback();
  const frame = getCurrentFlipFrame();
  const bounds = getFlipFrameBounds(frame);
  if (!bounds) {
    setFlipStatus("Draw something before scaling.");
    return;
  }

  saveFlipState();
  const originX = bounds.x + bounds.width / 2;
  const originY = bounds.y + bounds.height / 2;
  const strokes = getSelectedFlipStrokes();
  const targets = strokes.length ? strokes : frame.strokes;
  for (const stroke of targets) {
    stroke.size = Math.max(1, stroke.size * scale);
    for (const point of stroke.points) {
      point.x = originX + (point.x - originX) * scale;
      point.y = originY + (point.y - originY) * scale;
    }
  }

  redrawFlipCanvas();
  renderFlipFrames();
  setFlipStatus(scale > 1 ? "Frame scaled up." : "Frame scaled down.");
}

function getFlipFrameBounds(frame) {
  return getFlipStrokesBounds(frame.strokes);
}

function getFlipStrokesBounds(strokes) {
  const points = strokes.flatMap((stroke) => stroke.points);
  if (points.length === 0) return null;

  const minX = Math.min(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxX = Math.max(...points.map((point) => point.x));
  const maxY = Math.max(...points.map((point) => point.y));
  const padding = 18;

  return {
    x: minX - padding,
    y: minY - padding,
    width: Math.max(1, maxX - minX + padding * 2),
    height: Math.max(1, maxY - minY + padding * 2)
  };
}

function getStrokeBounds(stroke) {
  return getFlipStrokesBounds([stroke]);
}

function getSelectedFlipStrokes() {
  const selectedIds = new Set(flipSelectionIds);
  return getCurrentFlipFrame().strokes.filter((stroke) => selectedIds.has(ensureFlipStrokeId(stroke).id));
}

function ensureFlipStrokeId(stroke) {
  if (!stroke.id) {
    stroke.id = createId();
  }
  return stroke;
}

function isPointInFlipSelection(point) {
  const bounds = getFlipStrokesBounds(getSelectedFlipStrokes());
  if (!bounds) return false;
  return point.x >= bounds.x && point.x <= bounds.x + bounds.width && point.y >= bounds.y && point.y <= bounds.y + bounds.height;
}

function isFlipShapeTool(tool) {
  return tool === "line" || tool === "rect" || tool === "ellipse";
}

function makeRectFromPoints(a, b) {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y)
  };
}

function rectsIntersect(a, b) {
  if (!a || !b) return false;
  return a.x <= b.x + b.width && a.x + a.width >= b.x && a.y <= b.y + b.height && a.y + a.height >= b.y;
}

function saveFlipState() {
  flipUndoStack.push(getFlipSnapshot());
  if (flipUndoStack.length > 80) flipUndoStack.shift();
  flipRedoStack = [];
  updateFlipFrameCount();
}

function getFlipSnapshot() {
  return {
    frames: flipFrames.map((frame) => createFlipFrame(frame.strokes, frame.note)),
    index: flipFrameIndex
  };
}

function restoreFlipSnapshot(snapshot) {
  flipFrames = snapshot.frames.map((frame) => createFlipFrame(frame.strokes, frame.note));
  flipFrameIndex = Math.max(0, Math.min(snapshot.index, flipFrames.length - 1));
  flipSelectionIds = [];
  flipSelectionRect = null;
  flipNoteInput.value = getCurrentFlipFrame().note;
  flipDrawing = false;
  flipActiveStroke = null;
  flipTransformStart = null;
  redrawFlipCanvas();
  renderFlipFrames();
}

function undoFlipbook() {
  stopFlipPlayback();
  if (flipUndoStack.length === 0) return;
  flipRedoStack.push(getFlipSnapshot());
  restoreFlipSnapshot(flipUndoStack.pop());
  setFlipStatus("Undo.");
}

function redoFlipbook() {
  stopFlipPlayback();
  if (flipRedoStack.length === 0) return;
  flipUndoStack.push(getFlipSnapshot());
  restoreFlipSnapshot(flipRedoStack.pop());
  setFlipStatus("Redo.");
}

function copyFlipSelection() {
  const selected = getSelectedFlipStrokes();
  if (selected.length === 0) {
    setFlipStatus("Select something before copying.");
    return;
  }

  flipClipboard = selected.map(cloneStroke);
  updateFlipFrameCount();
  setFlipStatus(`${flipClipboard.length} item${flipClipboard.length === 1 ? "" : "s"} copied.`);
}

function pasteFlipSelection() {
  if (flipClipboard.length === 0) {
    setFlipStatus("Nothing copied yet.");
    return;
  }

  stopFlipPlayback();
  saveFlipState();
  const pasted = flipClipboard.map((stroke) => {
    const next = cloneStroke(stroke);
    next.id = createId();
    for (const point of next.points) {
      point.x += 32;
      point.y += 32;
    }
    return next;
  });

  getCurrentFlipFrame().strokes.push(...pasted);
  flipSelectionIds = pasted.map((stroke) => stroke.id);
  setFlipTool("select");
  redrawFlipCanvas();
  renderFlipFrames();
  setFlipStatus(`${pasted.length} item${pasted.length === 1 ? "" : "s"} pasted.`);
}

function deleteFlipSelection() {
  if (flipSelectionIds.length === 0) return false;
  stopFlipPlayback();
  saveFlipState();
  const selectedIds = new Set(flipSelectionIds);
  getCurrentFlipFrame().strokes = getCurrentFlipFrame().strokes.filter((stroke) => !selectedIds.has(ensureFlipStrokeId(stroke).id));
  flipSelectionIds = [];
  redrawFlipCanvas();
  renderFlipFrames();
  setFlipStatus("Selection deleted.");
  return true;
}

function handleFlipbookShortcut(event) {
  const key = event.key.toLowerCase();
  const textField = event.target && ["INPUT", "TEXTAREA"].includes(event.target.tagName);
  if (textField) return false;

  if ((event.ctrlKey || event.metaKey) && key === "z") {
    event.preventDefault();
    if (event.shiftKey) {
      redoFlipbook();
    } else {
      undoFlipbook();
    }
    return true;
  }

  if ((event.ctrlKey || event.metaKey) && key === "y") {
    event.preventDefault();
    redoFlipbook();
    return true;
  }

  if ((event.ctrlKey || event.metaKey) && key === "c") {
    event.preventDefault();
    copyFlipSelection();
    return true;
  }

  if ((event.ctrlKey || event.metaKey) && key === "v") {
    event.preventDefault();
    pasteFlipSelection();
    return true;
  }

  if (event.key === "Delete" || event.key === "Backspace") {
    if (deleteFlipSelection()) {
      event.preventDefault();
      return true;
    }
  }

  return false;
}

function toggleFlipPlayback() {
  if (flipPlayTimer) {
    stopFlipPlayback();
  } else {
    startFlipPlayback();
  }
}

function startFlipPlayback() {
  if (flipFrames.length === 0) return;
  const fps = Math.max(1, Math.min(24, Math.round(Number(flipFpsInput.value) || 6)));
  flipPlayButton.textContent = "Stop";
  setFlipStatus("Playing flipbook.");
  flipPlayTimer = window.setInterval(() => {
    flipFrameIndex = (flipFrameIndex + 1) % flipFrames.length;
    flipNoteInput.value = getCurrentFlipFrame().note;
    redrawFlipCanvas();
    renderFlipFrames();
  }, 1000 / fps);
}

function stopFlipPlayback() {
  if (!flipPlayTimer) return;
  window.clearInterval(flipPlayTimer);
  flipPlayTimer = 0;
  flipPlayButton.textContent = "Play";
  redrawFlipCanvas();
  renderFlipFrames();
}

function restartFlipPlaybackIfNeeded() {
  if (!flipPlayTimer) return;
  stopFlipPlayback();
  startFlipPlayback();
}

function setFlipStatus(message) {
  flipStatus.textContent = message;
}

async function exportFlipbookPdf() {
  stopFlipPlayback();
  setFlipStatus("Building PDF.");

  try {
    const pages = flipFrames.map((frame, index) => renderFlipPdfPage(frame, index));
    const pdfBytes = buildImagePdf(pages);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `motionking-flipbook-${Date.now()}.pdf`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    setFlipStatus("PDF exported.");
  } catch (error) {
    setFlipStatus(`Could not export PDF: ${error.message}`);
  }
}

function renderFlipPdfPage(frame, index) {
  const pageCanvas = document.createElement("canvas");
  pageCanvas.width = 1224;
  pageCanvas.height = 1584;
  const context = pageCanvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
  context.fillStyle = "#172026";
  context.font = "700 46px Arial, Helvetica, sans-serif";
  context.fillText(`Frame ${index + 1}`, 84, 96);

  const drawing = renderFlipFrameBitmap(frame);
  const maxWidth = pageCanvas.width - 168;
  const maxHeight = 850;
  const scale = Math.min(maxWidth / drawing.width, maxHeight / drawing.height);
  const width = drawing.width * scale;
  const height = drawing.height * scale;
  const x = (pageCanvas.width - width) / 2;
  const y = 140;

  context.strokeStyle = "#d8e1e6";
  context.lineWidth = 3;
  context.strokeRect(x - 2, y - 2, width + 4, height + 4);
  context.drawImage(drawing, x, y, width, height);

  const note = frame.note.trim();
  context.fillStyle = "#65737d";
  context.font = "700 28px Arial, Helvetica, sans-serif";
  context.fillText("Direction note", 84, 1060);

  context.fillStyle = "#172026";
  context.font = "28px Arial, Helvetica, sans-serif";
  wrapCanvasText(context, note || "No note.", 84, 1112, pageCanvas.width - 168, 38);

  return {
    dataUrl: pageCanvas.toDataURL("image/jpeg", 0.92),
    width: pageCanvas.width,
    height: pageCanvas.height
  };
}

function renderFlipFrameBitmap(frame) {
  const canvas = document.createElement("canvas");
  canvas.width = flipCanvas.width;
  canvas.height = flipCanvas.height;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawFlipFrameOnContext(context, frame, canvas.width, canvas.height);
  return canvas;
}

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(/\s+/);
  let line = "";
  let currentY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    context.fillText(line, x, currentY);
  }
}

function buildImagePdf(pages) {
  const pageWidth = 612;
  const pageHeight = 792;
  const objects = [];
  const pageObjectIds = [];

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push(null);

  pages.forEach((page, index) => {
    const pageObjectId = objects.length + 1;
    const contentObjectId = pageObjectId + 1;
    const imageObjectId = pageObjectId + 2;
    const imageName = `/Im${index + 1}`;
    const imageBinary = dataUrlToBinary(page.dataUrl);
    const content = `q ${pageWidth} 0 0 ${pageHeight} 0 0 cm ${imageName} Do Q`;

    pageObjectIds.push(pageObjectId);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << ${imageName} ${imageObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`);
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
    objects.push(`<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBinary.length} >>\nstream\n${imageBinary}\nendstream`);
  });

  objects[1] = `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjectIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const bytes = new Uint8Array(pdf.length);
  for (let index = 0; index < pdf.length; index += 1) {
    bytes[index] = pdf.charCodeAt(index) & 255;
  }

  return bytes;
}

function dataUrlToBinary(dataUrl) {
  const base64 = dataUrl.split(",")[1] || "";
  return atob(base64);
}

function startDrawing(event) {
  event.preventDefault();
  drawCanvas.setPointerCapture(event.pointerId);
  saveDrawingState();
  isDrawing = true;
  activeStroke = createStroke(getCanvasPoint(event));
  drawingStrokes.push(activeStroke);
  redrawCanvas();
}

function continueDrawing(event) {
  if (!isDrawing || !activeStroke) return;
  event.preventDefault();
  activeStroke.points.push(getCanvasPoint(event));
  redrawCanvas();
}

function finishDrawing(event) {
  if (!isDrawing) return;
  event.preventDefault();
  isDrawing = false;
  activeStroke = null;
}

function createStroke(point) {
  return {
    tool: drawTool,
    color: drawColorInput.value,
    size: Number(drawSizeInput.value),
    points: [point]
  };
}

function getCanvasPoint(event) {
  const rect = drawCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * drawCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * drawCanvas.height
  };
}

function redrawCanvas() {
  drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

  for (const layer of drawingLayers) {
    drawLayer(layer);
  }

  strokeContext.clearRect(0, 0, strokeCanvas.width, strokeCanvas.height);
  for (const stroke of drawingStrokes) {
    drawStroke(stroke);
  }
  drawContext.drawImage(strokeCanvas, 0, 0);
}

function drawLayer(layer) {
  if (!layer.visible) return;

  const scale = Math.min(drawCanvas.width / layer.width, drawCanvas.height / layer.height);
  const width = layer.width * scale;
  const height = layer.height * scale;
  const x = (drawCanvas.width - width) / 2;
  const y = (drawCanvas.height - height) / 2;

  drawContext.save();
  drawContext.globalAlpha = layer.opacity;
  drawContext.drawImage(layer.image, x, y, width, height);
  drawContext.restore();
}

function drawStroke(stroke) {
  const points = stroke.points;
  if (points.length === 0) return;

  strokeContext.save();
  strokeContext.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over";
  strokeContext.strokeStyle = stroke.color;
  strokeContext.lineWidth = stroke.size;
  strokeContext.lineCap = "round";
  strokeContext.lineJoin = "round";

  strokeContext.beginPath();
  strokeContext.moveTo(points[0].x, points[0].y);

  if (points.length === 1) {
    strokeContext.lineTo(points[0].x + 0.01, points[0].y + 0.01);
  } else {
    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      const midX = (previous.x + current.x) / 2;
      const midY = (previous.y + current.y) / 2;
      strokeContext.quadraticCurveTo(previous.x, previous.y, midX, midY);
    }
  }

  strokeContext.stroke();
  strokeContext.restore();
}

async function importLayerFiles() {
  const files = Array.from(layerFileInput.files || []);
  if (files.length === 0) return;

  saveDrawingState();

  try {
    const layers = await Promise.all(files.map(createImageLayer));
    drawingLayers.push(...layers);
    renderLayersList();
    redrawCanvas();
    setDrawStatus(`${layers.length} layer${layers.length === 1 ? "" : "s"} imported.`);
  } catch (error) {
    undoStack.pop();
    setDrawStatus(`Could not import layer: ${error.message}`);
  } finally {
    layerFileInput.value = "";
    updateUndoRedoButtons();
  }
}

async function createImageLayer(file) {
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);

  return {
    id: createId(),
    name: file.name,
    image,
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
    visible: true,
    opacity: 1
  };
}

function createId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("The file could not be read."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("The image or vector could not be loaded."));
    image.src = src;
  });
}

function renderLayersList() {
  layersList.innerHTML = "";

  if (drawingLayers.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No imported layers.";
    layersList.append(empty);
    return;
  }

  drawingLayers.forEach((layer, index) => {
    const item = document.createElement("div");
    item.className = "layer-item";

    const visible = document.createElement("input");
    visible.type = "checkbox";
    visible.checked = layer.visible;
    visible.setAttribute("aria-label", `Toggle ${layer.name}`);
    visible.addEventListener("change", () => {
      saveDrawingState();
      layer.visible = visible.checked;
      redrawCanvas();
      updateUndoRedoButtons();
    });

    const name = document.createElement("span");
    name.className = "layer-name";
    name.textContent = `${index + 1}. ${layer.name}`;
    name.title = layer.name;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      saveDrawingState();
      drawingLayers = drawingLayers.filter((candidate) => candidate.id !== layer.id);
      renderLayersList();
      redrawCanvas();
      updateUndoRedoButtons();
    });

    item.append(visible, name, remove);
    layersList.append(item);
  });
}

function saveDrawingState() {
  undoStack.push(getDrawingSnapshot());
  if (undoStack.length > 80) undoStack.shift();
  redoStack = [];
  updateUndoRedoButtons();
}

function getDrawingSnapshot() {
  return {
    width: drawCanvas.width,
    height: drawCanvas.height,
    strokes: drawingStrokes.map(cloneStroke),
    layers: drawingLayers.slice()
  };
}

function cloneStroke(stroke) {
  return {
    ...stroke,
    points: stroke.points.map((point) => ({ ...point }))
  };
}

function restoreDrawingSnapshot(snapshot) {
  if (snapshot.width && snapshot.height) {
    setDrawingCanvasSize(snapshot.width, snapshot.height);
  }

  drawingStrokes = snapshot.strokes.map(cloneStroke);
  drawingLayers = snapshot.layers.slice();
  activeStroke = null;
  isDrawing = false;
  renderLayersList();
  redrawCanvas();
  updateUndoRedoButtons();
}

function undoDrawing() {
  if (undoStack.length === 0) return;
  redoStack.push(getDrawingSnapshot());
  restoreDrawingSnapshot(undoStack.pop());
  setDrawStatus("Undo.");
}

function redoDrawing() {
  if (redoStack.length === 0) return;
  undoStack.push(getDrawingSnapshot());
  restoreDrawingSnapshot(redoStack.pop());
  setDrawStatus("Redo.");
}

function updateUndoRedoButtons() {
  undoDrawButton.disabled = undoStack.length === 0;
  redoDrawButton.disabled = redoStack.length === 0;
}

function exportDrawing() {
  const link = document.createElement("a");
  link.href = drawCanvas.toDataURL("image/png");
  link.download = `motionking-drawing-${Date.now()}.png`;
  link.click();
  setDrawStatus("PNG exported.");
}

async function copyDrawing() {
  const dataUrl = drawCanvas.toDataURL("image/png");

  try {
    if (window.motionKing && window.motionKing.copyPng) {
      await window.motionKing.copyPng(dataUrl);
      setDrawStatus("PNG copied to clipboard.");
      return;
    }

    const blob = await new Promise((resolve) => drawCanvas.toBlob(resolve, "image/png"));
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    setDrawStatus("PNG copied to clipboard.");
  } catch (error) {
    setDrawStatus(`Could not copy PNG: ${error.message}`);
  }
}

function setDrawStatus(message) {
  drawStatus.textContent = message;
}

function updatePreview() {
  updateSizeControls();
  previewFrame.style.width = `min(100%, ${widthInput.value}px)`;
  previewFrame.style.height = `min(100%, ${heightInput.value}px)`;
  previewFrame.srcdoc = buildPreviewDocument(codeInput.value, "preview");

  if (!fullView.hidden) {
    syncFullView();
  }
}

function getRenderSize() {
  const mode = sizeModeInput.value;
  if (mode === "full") {
    return getFullViewSize();
  }

  if (mode === "preview") {
    return getVisiblePreviewSize();
  }

  return {
    width: Number(widthInput.value),
    height: Number(heightInput.value)
  };
}

function getFullViewSize() {
  const barHeight = 56;

  return {
    width: Math.max(120, Math.round(window.innerWidth)),
    height: Math.max(120, Math.round(window.innerHeight - barHeight))
  };
}

function getVisiblePreviewSize() {
  const rect = previewFrame.getBoundingClientRect();

  return {
    width: Math.max(120, Math.round(rect.width)),
    height: Math.max(120, Math.round(rect.height))
  };
}

function updateSizeControls() {
  const isCustom = sizeModeInput.value === "custom";
  widthInput.disabled = !isCustom;
  heightInput.disabled = !isCustom;
}

function syncRenderSizeFields() {
  if (sizeModeInput.value === "custom") return;

  const size = getRenderSize();
  widthInput.value = size.width;
  heightInput.value = size.height;
  updatePreview();
}

function syncFullView() {
  setFullViewFrozen(false);
  fullViewOpenedAt = performance.now();
  fullViewLogs = [];
  renderFullConsole();
  fullPreviewFrame.srcdoc = buildPreviewDocument(codeInput.value, "full");
}

function closeFullView() {
  fullView.hidden = true;
  fullViewOpenedAt = 0;
  setFullViewFrozen(false);
  fullPreviewFrame.srcdoc = "about:blank";
}

function loadFileSnapshot(file) {
  stopWatching();
  currentFilePath = file.path || "";
  currentFileMtime = Number(file.mtimeMs) || 0;
  currentFileSize = Number(file.size) || 0;
  codeInput.value = file.content || "";
  sizeEditedByUser = false;
  inferSizeFromMarkup();
  updatePreview();
  updateWatchButton();
  setStatus(`Loaded ${file.name || "file"}.`);
}

function startWatching() {
  if (!window.motionKing || !window.motionKing.readFile || !currentFilePath) {
    setStatus("Live checking is only available for files opened in the desktop app.");
    return;
  }

  watchButton.setAttribute("aria-pressed", "true");
  watchButton.textContent = "Check Changes: On";
  setStatus("Checking for external file changes.");
  watchTimer = window.setInterval(checkForFileChange, 1000);
  checkForFileChange();
}

function stopWatching() {
  if (watchTimer) {
    window.clearInterval(watchTimer);
    watchTimer = 0;
  }

  updateWatchButton();
}

async function checkForFileChange() {
  if (watchInFlight || !currentFilePath || !window.motionKing || !window.motionKing.readFile) return;

  watchInFlight = true;
  try {
    const file = await window.motionKing.readFile(currentFilePath);
    if (Number(file.mtimeMs) !== currentFileMtime || Number(file.size) !== currentFileSize) {
      currentFileMtime = Number(file.mtimeMs) || 0;
      currentFileSize = Number(file.size) || 0;
      codeInput.value = file.content || "";
      if (!sizeEditedByUser) inferSizeFromMarkup();
      updatePreview();
      setStatus(`Updated from ${file.name || "file"}.`);
    }
  } catch (error) {
    stopWatching();
    setStatus(`Stopped checking changes: ${error.message}`);
  } finally {
    watchInFlight = false;
  }
}

function updateWatchButton() {
  const canWatch = Boolean(currentFilePath && window.motionKing && window.motionKing.readFile);
  watchButton.disabled = !canWatch;
  watchButton.setAttribute("aria-pressed", watchTimer ? "true" : "false");
  watchButton.textContent = watchTimer ? "Check Changes: On" : "Check Changes: Off";
}

function buildPreviewDocument(markup, frameId = "preview") {
  const bridgeScript = frameId === "full" ? getPreviewBridgeScript(frameId) : "";

  if (isFullHtmlDocument(markup)) {
    return injectPreviewBridge(markup, bridgeScript);
  }

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    html, body {
      width: 100%;
      height: 100%;
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
  ${bridgeScript}
</head>
<body>
${markup}
</body>
</html>`;
}

function injectPreviewBridge(markup, bridgeScript) {
  if (/<head[\s>]/i.test(markup)) {
    return markup.replace(/<head([^>]*)>/i, `<head$1>${bridgeScript}`);
  }

  if (/<html[\s>]/i.test(markup)) {
    return markup.replace(/<html([^>]*)>/i, `<html$1>${bridgeScript}`);
  }

  return `${bridgeScript}${markup}`;
}

function getPreviewBridgeScript(frameId) {
  const safeFrameId = JSON.stringify(frameId);

  return `<script>
(() => {
  if (window.__motionKingBridgeReady) return;
  window.__motionKingBridgeReady = true;

  const frameId = ${safeFrameId};
  const native = {
    requestAnimationFrame: window.requestAnimationFrame.bind(window),
    cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    setInterval: window.setInterval.bind(window),
    clearInterval: window.clearInterval.bind(window)
  };
  const originalConsole = {};
  const pendingRafs = new Map();
  const timers = new Map();
  const intervals = new Map();
  let frozen = false;
  let nextRafId = 1;
  let nextTimerId = 1;
  let pausedMedia = [];
  let freezeStyle = null;

  function send(level, args) {
    try {
      parent.postMessage({
        source: "motionking-preview",
        frameId,
        level,
        args: Array.from(args || []).map(stringifyValue),
        time: new Date().toLocaleTimeString()
      }, "*");
    } catch (_error) {}
  }

  function stringifyValue(value) {
    if (value instanceof Error) return value.stack || value.message;
    if (typeof value === "string") return value;
    try {
      return JSON.stringify(value);
    } catch (_error) {
      return String(value);
    }
  }

  ["log", "info", "warn", "error"].forEach((level) => {
    originalConsole[level] = console[level] ? console[level].bind(console) : () => {};
    console[level] = (...args) => {
      send(level, args);
      originalConsole[level](...args);
    };
  });

  window.addEventListener("error", (event) => {
    send("error", [event.error || event.message || "Runtime error"]);
  });

  window.addEventListener("unhandledrejection", (event) => {
    send("error", [event.reason || "Unhandled promise rejection"]);
  });

  window.requestAnimationFrame = (callback) => {
    const id = nextRafId++;
    const run = (time) => {
      if (frozen) {
        pendingRafs.set(id, callback);
        return;
      }
      pendingRafs.delete(id);
      callback(time);
    };
    pendingRafs.set(id, callback);
    native.requestAnimationFrame(run);
    return id;
  };

  window.cancelAnimationFrame = (id) => {
    pendingRafs.delete(id);
  };

  window.setTimeout = (callback, delay = 0, ...args) => {
    const id = nextTimerId++;
    const run = () => {
      timers.delete(id);
      if (frozen) {
        timers.set(id, { callback, delay: 0, args });
        return;
      }
      if (typeof callback === "function") {
        callback(...args);
      } else {
        Function(String(callback))();
      }
    };
    const nativeId = native.setTimeout(run, delay);
    timers.set(id, { callback, delay, args, nativeId });
    return id;
  };

  window.clearTimeout = (id) => {
    const timer = timers.get(id);
    if (timer && timer.nativeId) native.clearTimeout(timer.nativeId);
    timers.delete(id);
  };

  window.setInterval = (callback, delay = 0, ...args) => {
    const id = nextTimerId++;
    const nativeId = native.setInterval(() => {
      if (frozen) return;
      if (typeof callback === "function") {
        callback(...args);
      } else {
        Function(String(callback))();
      }
    }, delay);
    intervals.set(id, nativeId);
    return id;
  };

  window.clearInterval = (id) => {
    const nativeId = intervals.get(id);
    if (nativeId) native.clearInterval(nativeId);
    intervals.delete(id);
  };

  function freeze() {
    if (frozen) return;
    frozen = true;

    document.getAnimations({ subtree: true }).forEach((animation) => {
      try { animation.pause(); } catch (_error) {}
    });

    pausedMedia = Array.from(document.querySelectorAll("video, audio")).filter((media) => !media.paused);
    pausedMedia.forEach((media) => {
      try { media.pause(); } catch (_error) {}
    });

    freezeStyle = document.createElement("style");
    freezeStyle.dataset.motionkingFreeze = "true";
    freezeStyle.textContent = "*,*::before,*::after{animation-play-state:paused!important;transition-property:none!important;}";
    document.head.append(freezeStyle);
  }

  function unfreeze() {
    if (!frozen) return;
    frozen = false;

    if (freezeStyle) {
      freezeStyle.remove();
      freezeStyle = null;
    }

    document.getAnimations({ subtree: true }).forEach((animation) => {
      try { animation.play(); } catch (_error) {}
    });

    pausedMedia.forEach((media) => {
      try { media.play(); } catch (_error) {}
    });
    pausedMedia = [];

    const callbacks = Array.from(pendingRafs.entries());
    pendingRafs.clear();
    callbacks.forEach(([id, callback]) => {
      native.requestAnimationFrame((time) => {
        if (!pendingRafs.has(id)) callback(time);
      });
    });

    const dueTimers = Array.from(timers.entries()).filter(([, timer]) => !timer.nativeId);
    dueTimers.forEach(([id, timer]) => {
      timers.delete(id);
      native.setTimeout(() => {
        if (typeof timer.callback === "function") {
          timer.callback(...timer.args);
        } else {
          Function(String(timer.callback))();
        }
      }, 0);
    });
  }

  window.addEventListener("message", (event) => {
    const data = event.data || {};
    if (!data.motionKing || data.target !== "motionking-preview") return;
    if (data.command === "freeze") freeze();
    if (data.command === "unfreeze") unfreeze();
  });
})();
</script>`;
}

function isFullHtmlDocument(markup) {
  return /<!doctype\s+html/i.test(markup) || /<html[\s>]/i.test(markup);
}

function inferSizeFromMarkup() {
  const parser = new DOMParser();
  const doc = parser.parseFromString(codeInput.value, "text/html");
  const root = doc.body.firstElementChild;

  if (!root) return;

  const width = parsePixelValue(root.getAttribute("width"));
  const height = parsePixelValue(root.getAttribute("height"));
  const viewBox = root.getAttribute("viewBox");

  if (width) widthInput.value = width;
  if (height) heightInput.value = height;

  if ((!width || !height) && viewBox) {
    const parts = viewBox.split(/\s+/).map(Number);
    if (parts.length === 4 && parts.every(Number.isFinite)) {
      if (!width) widthInput.value = Math.round(parts[2]);
      if (!height) heightInput.value = Math.round(parts[3]);
    }
  }
}

function parsePixelValue(value) {
  if (!value) return 0;
  const parsed = Number(String(value).replace("px", ""));
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : 0;
}

function setStatus(message) {
  statusEl.innerHTML = message;
}
