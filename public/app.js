const codeInput = document.querySelector("#codeInput");
const previewFrame = document.querySelector("#previewFrame");
const fullPreviewFrame = document.querySelector("#fullPreviewFrame");
const fullView = document.querySelector("#fullView");
const fullViewButton = document.querySelector("#fullViewButton");
const closeFullViewButton = document.querySelector("#closeFullViewButton");
const fileInput = document.querySelector("#fileInput");
const openFileButton = document.querySelector("#openFileButton");
const themeButton = document.querySelector("#themeButton");
const drawButton = document.querySelector("#drawButton");
const watchButton = document.querySelector("#watchButton");
const refreshButton = document.querySelector("#refreshButton");
const sampleButton = document.querySelector("#sampleButton");
const renderForm = document.querySelector("#renderForm");
const renderButton = document.querySelector("#renderButton");
const statusEl = document.querySelector("#status");
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
      <stop offset="0%" stop-color="#ffb000" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#ffb000" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#111111" stop-opacity="0" />
    </radialGradient>

    <style>
      .background { fill: #111111; }

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
        opacity: 0;
      }

      .word-1 { animation: morphWord 8s infinite; }
      .word-2 { animation: morphWord 8s infinite; animation-delay: 2s; }
      .word-3 { animation: morphWord 8s infinite; animation-delay: 4s; }
      .word-4 { animation: morphWord 8s infinite; animation-delay: 6s; }

      @keyframes morphWord {
        0% { opacity: 0; filter: blur(22px); transform: scale(0.75); }
        10% { opacity: 1; filter: blur(0px); transform: scale(1); }
        25% { opacity: 1; filter: blur(0px); transform: scale(1); }
        35% { opacity: 0; filter: blur(22px); transform: scale(1.25); }
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
let drawTool = "pen";
let isDrawing = false;
let activeStroke = null;
let drawingStrokes = [];
let drawingLayers = [];
let undoStack = [];
let redoStack = [];

applyTheme(localStorage.getItem("motionking-theme") || "dark");
codeInput.value = sampleMarkup;
updatePreview();
syncRenderSizeFields();
redrawCanvas();
renderLayersList();

codeInput.addEventListener("input", () => {
  window.clearTimeout(previewTimer);
  previewTimer = window.setTimeout(() => {
    if (!sizeEditedByUser) inferSizeFromMarkup();
    updatePreview();
  }, 250);
});

refreshButton.addEventListener("click", updatePreview);

themeButton.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

drawButton.addEventListener("click", () => {
  drawModal.hidden = false;
  redrawCanvas();
});

closeDrawButton.addEventListener("click", closeDrawModal);

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
});

closeFullViewButton.addEventListener("click", closeFullView);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !fullView.hidden) {
    closeFullView();
  }

  if (event.key === "Escape" && !drawModal.hidden) {
    closeDrawModal();
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
    const label = result.type === "sequence" ? "Download PNG sequence" : "Download MP4";
    setProgress(100, "Render complete");
    setStatus(`${label}: <a href="${result.url}" download>${result.url}</a>`);
  } catch (error) {
    setStatus(error.message);
    setProgress(100, "Render failed");
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

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("motionking-theme", theme);
  themeButton.textContent = theme === "dark" ? "Light" : "Dark";
  themeButton.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

function closeDrawModal() {
  drawModal.hidden = true;
}

function setDrawTool(tool) {
  drawTool = tool;
  penToolButton.setAttribute("aria-pressed", tool === "pen" ? "true" : "false");
  eraserToolButton.setAttribute("aria-pressed", tool === "eraser" ? "true" : "false");
  drawCanvas.style.cursor = tool === "eraser" ? "cell" : "crosshair";
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
  previewFrame.srcdoc = buildPreviewDocument(codeInput.value);

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
  fullPreviewFrame.srcdoc = buildPreviewDocument(codeInput.value);
}

function closeFullView() {
  fullView.hidden = true;
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

function buildPreviewDocument(markup) {
  if (isFullHtmlDocument(markup)) {
    return markup;
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
</head>
<body>
${markup}
</body>
</html>`;
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
