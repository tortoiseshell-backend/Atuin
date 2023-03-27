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
    let result = scroll;
    result = Math.max(result, -ratio * 100);
    result = Math.min(result, ratio * 100);
    return result;
  }

  getPhotoDimensions(imageURL, (err, img) => {
    if (err) return;
    const aspectRatio = img.width / img.height;
    const adjustmentRatioX = aspectRatio / 2;
    const adjustmentRatioY = (1 / aspectRatio) / 2;
    // console.log(aspectRatio, img.width, img.height)

    const actualImageWidth = container.offsetWidth;
    const actualImageHeight = container.offsetHeight;
    const zoomScale = 2.5;

    const percentXScroll = boundScroll(((event.clientX - container.getBoundingClientRect().x)
      / (actualImageWidth) - 0.5) * -200, adjustmentRatioX);
    const percentYScroll = boundScroll(((event.clientY - container.getBoundingClientRect().y)
      / (actualImageHeight) - 0.5) * -200, adjustmentRatioY);

    // console.log(img.width * zoomScale, img.height * zoomScale);
    console.log(image.clientWidth, image.clientHeight, percentXScroll, percentYScroll);
    image.style.transform = `translate(${percentXScroll}%, ${percentYScroll}%) scale(${zoomScale})`;
  });
}
