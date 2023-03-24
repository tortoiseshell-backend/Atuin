import { useSelector } from 'react-redux';

export default function checkExpandedView() {
  const isExpandedView = useSelector((state) => state.product.isExpandedView);

  if (document.getElementById('app')) {
    document.getElementById('image-gallery').style.width = '100%';
    if (isExpandedView) {
      const expandedWidth = JSON.stringify(document.getElementById('app').clientWidth);
      document.getElementById('image-gallery').style.width = `${expandedWidth}px`;
    }
  }
}
