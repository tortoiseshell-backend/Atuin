export function renderCart() {
  document.getElementById('cart-list').style['max-height'] = '500px';
  document.getElementById('cart-list').style.visibility = 'visible';
}

export function hideCart() {
  document.getElementById('cart-list').style['max-height'] = 0;
  document.getElementById('cart-list').style.visibility = 'collapse';
}
