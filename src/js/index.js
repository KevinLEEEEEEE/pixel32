import '../css/main.css';

import canvasManager from './api/canvasManager';

const canvas = document.getElementById('locationCanvas');

const c = canvasManager(canvas, 32, 32);

const size = c.getComputedSize();

const pSize = c.getPixelSize();

c.draw([1, 1], [0, 0, 0, 255]);
c.draw([3, 1], [0, 0, 0, 255]);

console.log(size, pSize);
