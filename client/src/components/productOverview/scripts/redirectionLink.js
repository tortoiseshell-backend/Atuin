export default function redirectionLink(url) {
  const newTab = document.createElement('a');
  newTab.target = '_blank';
  newTab.href = url;
  newTab.click();
}
