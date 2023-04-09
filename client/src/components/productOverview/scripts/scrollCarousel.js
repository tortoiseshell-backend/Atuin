export default function scrollCarousel(index, isAbsolute) {
  const scrollRate = 62.78;
  const carousel = document.getElementById('carousel-body');

  let scrollLocation = isAbsolute ? 0 : carousel.scrollTop;
  scrollLocation += index * scrollRate;
  if (scrollLocation > carousel.scrollHeight) {
    scrollLocation = carousel.scrollHeight;
  }
  if (scrollLocation < 0) {
    scrollLocation = 0;
  }

  carousel.scrollTo({ top: scrollLocation, behavior: 'smooth' });
}
