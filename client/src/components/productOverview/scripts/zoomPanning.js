export default function ZoomPanning(event) {
  const container = document.getElementById('main-image-container');
  const image = document.getElementById('main-image');
  const imageURL = image.style['background-image'].replace('url("', '').replace(')"', '');

  function getPhotoDimensions(url, cb) {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  }

  function boundScroll(scroll, ratio) {
    let result = scroll - 0.5;
    result *= -Math.max(ratio * 250, 150);
    result = Math.max(result, -ratio * 100);
    result = Math.min(result, ratio * 100);
    return result;
  }

  getPhotoDimensions(imageURL, (err, img) => {
    if (err) return;
    const imageScaleRatio = Math.min(
      container.offsetWidth / img.width,
      container.offsetHeight / img.height,
    );

    const imageDimensions = {
      width: img.width * imageScaleRatio * 2.5,
      height: img.height * imageScaleRatio * 2.5,
    };

    const scrollLimit = {
      x: (imageDimensions.width - container.offsetWidth) / (2 * container.offsetWidth),
      y: (imageDimensions.height - container.offsetHeight) / (2 * container.offsetHeight),
    };

    const xScroll = boundScroll(
      (event.clientX - container.getBoundingClientRect().x)
      / container.offsetWidth,
      scrollLimit.x,
    );
    const yScroll = boundScroll(
      (event.clientY - container.getBoundingClientRect().y)
      / container.offsetHeight,
      scrollLimit.y,
    );

    image.style.transform = `translate(${xScroll}%, ${yScroll}%) scale(${2.5})`;
  });
}
