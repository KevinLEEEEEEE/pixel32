const _ = {

};

const canvasProp = {
  init() {
    const style = this.getComputedSize();
    const ratio = this.getRatio();

    this.canvas.width = style.width * ratio;
    this.canvas.height = style.height * ratio;

    this.context.scale(ratio, ratio);
  },

  getRatio() {
    const backingStore = this.context.backingStorePixelRatio
    || this.context.webkitBackingStorePixelRatio
    || this.context.mozBackingStorePixelRatio
    || this.context.msBackingStorePixelRatio
    || this.context.oBackingStorePixelRatio
    || this.context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  },

  getComputedSize() {
    let style = null;

    if (window.getComputedStyle) {
      style = window.getComputedStyle(this.canvas, null);
    } else {
      style = this.canvas.currentStyle; // IE
    }

    return {
      width: parseFloat(style.width),
      height: parseFloat(style.height),
    };
  },

  getPixelSize(pixelW, pixelH) {
    const computedSize = this.getComputedSize();

    return {
      width: computedSize.width / pixelW,
      height: computedSize.height / pixelH,
    };
  },

  draw(pos, color) { // pos:[x, y], color: [r, g, b, a];
    const x = pos[0] * this.pixelSize.width;
    const y = pos[1] * this.pixelSize.height;
    const pixelW = Math.round(this.pixelSize.width);
    const pixelH = Math.round(this.pixelSize.height);
    const formatccolor = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;

    this.context.fillStyle = formatccolor;

    this.context.fillRect(x, y, pixelW, pixelH);
  },

  wipe(pos) {

  },

  clear() {

  },

  revoke() {

  },

  addHistory() {

  },

  regressHistory() {

  },
};

export default function (canvas, pixelW, pixelH) {
  const tmp = Object.create(canvasProp);

  tmp.canvas = canvas;

  tmp.context = canvas.getContext('2d');
  tmp.pixelSize = tmp.getPixelSize(pixelW, pixelH);
  tmp.history = [];

  tmp.init();

  return tmp;
}