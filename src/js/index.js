import '../css/main.css';

import detectLayer from './detectLayer';
import contentLayer from './contentLayer';

const content = contentLayer(32, 32);

detectLayer(content, 32, 32);
