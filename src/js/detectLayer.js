import canvasManager from './api/canvasManager';

const FSM = {
  default: 0,
  draw: 1,
  wipe: 2,
};

export default function detectLayer(contentLayer, w, h) {
  const detectCanvas = document.getElementById('detectCanvas');

  const canvas = canvasManager(detectCanvas, w, h);

  let lastPos = [];

  let state = FSM.default;

  detectCanvas.addEventListener('mousemove', (e) => {
    const { layerX, layerY } = e;

    const x = Math.floor(layerX / canvas.pixelSize.width);
    const y = Math.floor(layerY / canvas.pixelSize.height);

    const pos = [x, y];

    if (lastPos[0] === pos[0] && lastPos[1] === pos[1]) {
      return;
    }

    lastPos = pos;

    canvas.clear();

    switch (state) {
    case FSM.wipe:
      contentLayer.wipe(pos);
      break;
    case FSM.draw:
      canvas.draw(pos, [0, 0, 0, 255]);
      contentLayer.draw(pos, [0, 0, 0, 255]);
      break;
    default:
      canvas.draw(pos, [0, 0, 0, 255]);
    }
  });

  detectCanvas.addEventListener('mousedown', (e) => {
    switch (e.button) {
    case 0:
      contentLayer.draw(lastPos, [0, 0, 0, 255]);
      state = FSM.draw;
      break;
    case 2:
      canvas.wipe(lastPos);
      contentLayer.wipe(lastPos);
      state = FSM.wipe;
      break;
    default:
    }
  });

  detectCanvas.addEventListener('mouseup', () => {
    state = FSM.default;
  });

  detectCanvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}
