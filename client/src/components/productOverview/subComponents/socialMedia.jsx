import React from 'react';
import redirectionLink from '../scripts/redirectionLink';

function SocialMedia() {
  const socialMediaStyle = 'm-2';
  const domainName = 'https://www.facebook.com/adidasUS/?brand_redir=182162001806727';

  const emailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=""&su=Check out this product from Adidae!&body=${domainName}`;
  const messengerURL = 'http://www.facebook.com/dialog/send?'
    + 'app_id=782031183543584'
    + `&link=${domainName}`
    + `&redirect_uri=${domainName}`;
  const twitterURL = 'https://twitter.com/share?'
    + 'text=Check out this product from Adidae! \n'
    + `&url=${domainName}`;

  return (
    <div>
      <button type="button" aria-label="share via Email" className={socialMediaStyle} onClick={() => redirectionLink(emailURL)}><i className="fa-solid fa-envelope text-secondary-200 text-xl" /></button>
      <button type="button" aria-label="share via Messenger" className={socialMediaStyle} onClick={() => redirectionLink(messengerURL)}><i className="fa-brands fa-facebook-messenger text-secondary-200 text-xl" /></button>
      <button type="button" aria-label="share via Twitter" className={socialMediaStyle} onClick={() => redirectionLink(twitterURL)}><i className="fa-brands fa-twitter text-secondary-200 text-xl" /></button>
    </div>
  );
}

export default SocialMedia;
