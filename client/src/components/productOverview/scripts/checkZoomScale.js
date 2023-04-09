export default function checkZoomScale(img) {
  const heightRatio = document.getElementById('image-gallery').clientHeight / img.height;
  const widthRatio = document.getElementById('image-gallery').clientWidth / img.width;
  const aspectRatio = Math.min(heightRatio, widthRatio);
  return Math.round((2.5 * aspectRatio) * 100000) / 100000;
}
