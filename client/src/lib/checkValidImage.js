export default function checkImage(url, callback) {
  const image = new Image();
  image.onload = () => {
    if (image.width > 0) {
      callback(true);
    }
  };
  image.onerror = () => {
    callback(false);
  };
  image.src = url;
}
