
const canvasProp = {
  init() {
    const style = this.getComputedSize();
    const ratio = this.getRatio();

    const w = this.completeLen(style.width, 32);
    const h = this.completeLen(style.height, 32);

    this.canvas.style.width = w;
    this.canvas.style.height = h;

    this.canvas.width = w * ratio;
    this.canvas.height = h * ratio;

    this.context.scale(ratio, ratio);

    return {
      w,
      h,
    };
  },

  completeLen(len, target) {
    return Math.ceil(len / target) * target;
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

  getPixelSize(pixelW, pixelH, { w, h }) {
    return {
      width: w / pixelW,
      height: h / pixelH,
    };
  },

  draw(pos, color) { // pos:[x, y], color: [r, g, b, a];
    const x = pos[0] * this.pixelSize.width;
    const y = pos[1] * this.pixelSize.height;
    const pixelW = this.pixelSize.width;
    const pixelH = this.pixelSize.height;
    const formatcolor = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;

    this.context.fillStyle = formatcolor;

    this.context.fillRect(x, y, pixelW, pixelH);
  },

  wipe(pos) {
    const x = pos[0] * this.pixelSize.width;
    const y = pos[1] * this.pixelSize.height;
    const pixelW = this.pixelSize.width;
    const pixelH = this.pixelSize.height;

    this.context.clearRect(x, y, pixelW, pixelH);
  },

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

export default function (canvas, pixelW, pixelH) {
  const tmp = Object.create(canvasProp);

  tmp.canvas = canvas;
  tmp.context = canvas.getContext('2d');
  tmp.size = tmp.init();
  tmp.pixelSize = tmp.getPixelSize(pixelW, pixelH, tmp.size);

  return tmp;
}
