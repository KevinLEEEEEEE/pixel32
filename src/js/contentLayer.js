import canvasManager from './api/canvasManager';

export default function contentLayer(w, h) {
  const contentCanvas = document.getElementById('contentCanvas');

  const canvas = canvasManager(contentCanvas, w, h);

  return canvas;
}
