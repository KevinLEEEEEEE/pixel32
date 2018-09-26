import '../css/main.css';

import detectLayer from './detectLayer';
import contentLayer from './contentLayer';

import intro from '../image/intro.jpg';

const content = contentLayer(32, 32);

detectLayer(content, 32, 32);

const img = new Image();

img.src = intro;

document.getElementById('introduction').appendChild(img);
