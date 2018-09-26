import canvasManager from './api/canvasManager';
import imageManager from './api/imageManager';

export default function contentLayer(w, h) {
  const contentCanvas = document.getElementById('contentCanvas');
  const clearBtn = document.getElementById('clear');
  const saveBtn = document.getElementById('save');
  const downloadBtn = document.getElementById('download');

  const canvas = canvasManager(contentCanvas, w, h);

  clearBtn.addEventListener('click', () => {
    canvas.clear();

    downloadBtn.classList.remove('enable');
    downloadBtn.classList.add('disable');
  });

  saveBtn.addEventListener('click', () => {
    const base64 = imageManager.convertCanvasToBase64(contentCanvas, 'jpeg', [230, 230, 230]);

    downloadBtn.setAttribute('href', base64);

    downloadBtn.classList.remove('disable');
    downloadBtn.classList.add('enable');
  });

  return canvas;
}
