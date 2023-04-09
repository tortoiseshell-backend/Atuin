import React from 'react';
import PropTypes from 'prop-types';

function Button({
  content,
  href,
  onClick,
  styleOverride,
  testID,
  name,
}) {
  let buttonStyle = 'w-full h-14 p-2 px-3 text-sm text-left font-semibold'
    + ' bg-secondary-300 hover:bg-secondary-300/95 text-white standard-border'
    + ' dark:bg-primary-300 dark:hover:bg-primary-300/95 dark:text-black dark:standard-border-dark';
  buttonStyle += styleOverride;

  let renderButton = (
    <button type="button" href={href} onClick={onClick} className={buttonStyle} data-testid={testID} name={name}>
      {content}
    </button>
  );

  if (href) {
    renderButton = (
      <a href={href} onClick={onClick} className={buttonStyle} data-testid={testID} name={name}>
        {content}
      </a>
    );
  }

  return (
    <div>
      {renderButton}
    </div>
  );
}
Button.propTypes = {
  content: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.any.isRequired,
  styleOverride: PropTypes.string,
};

Button.defaultProps = {
  href: undefined,
  styleOverride: '',
};

export default Button;
