
const imageManager = {
  convertCanvasToBase64(canvas, format, color) {
    const completeFormat = `image/${format}`;

    const context = canvas.getContext('2d');

    let composite = null;

    let data = null;

    if (color !== null) {
      data = context.getImageData(0, 0, canvas.width, canvas.height);

      const formatcolor = `rgb(${color[0]},${color[1]},${color[2]})`;

      composite = context.globalCompositeOperation;

      context.globalCompositeOperation = 'destination-over';

      context.fillStyle = formatcolor;

      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const imageData = canvas.toDataURL(completeFormat, format);

    if (color !== null) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.putImageData(data, 0, 0);

      context.globalCompositeOperation = composite;
    }

    return imageData;
  },

};

export default imageManager;
