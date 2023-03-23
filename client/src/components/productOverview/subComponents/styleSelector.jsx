import React from 'react';
import PropTypes from 'prop-types';

const styleSelectorStyle = 'style-unselected rounded-full bg-gray-100 h-14 w-14';

function StyleSelector({ style }) {
  function selectStyleHandler(event) {
    const currentSelected = Array.from(document.getElementsByClassName('style-selected'));
    currentSelected.forEach((selected) => selected.classList.replace('style-selected', 'style-unselected'));
    event.target.classList.replace('style-unselected', 'style-selected');
  }

  return (
    <div>
      <button type="button" aria-label={style.style_id} className={`${styleSelectorStyle}`} onClick={selectStyleHandler} />
    </div>
  );
}

export default StyleSelector;

StyleSelector.propTypes = {
  style: PropTypes.shape({
    style_id: PropTypes.number.isRequired,
  }).isRequired,
};
