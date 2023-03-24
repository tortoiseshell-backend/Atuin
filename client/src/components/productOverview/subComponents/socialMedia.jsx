import React from 'react';

function SocialMedia() {
  const socialMediaStyle = 'm-2';
  function selectImageHandler() {
  }

  return (
    <div>
      <button type="button" aria-label="share via Email" className={socialMediaStyle} onClick={selectImageHandler}><i className="fa-solid fa-envelope text-secondary-200 text-xl" /></button>
      <button type="button" aria-label="share via Messenger" className={socialMediaStyle} onClick={selectImageHandler}><i className="fa-brands fa-facebook-messenger text-secondary-200 text-xl" /></button>
      <button type="button" aria-label="share via Instagram" className={socialMediaStyle} onClick={selectImageHandler}><i className="fa-brands fa-instagram text-secondary-200 text-xl" /></button>
      <button type="button" aria-label="share via Twitter" className={socialMediaStyle} onClick={selectImageHandler}><i className="fa-brands fa-twitter text-secondary-200 text-xl" /></button>
    </div>
  );
}

export default SocialMedia;
