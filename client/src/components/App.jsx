import React from 'react';
import Modal from '@modular/Modal';
import { useSelector } from 'react-redux';
import HeaderBar from './headerBar';
import ProductOverview from './productOverview';
import RatingsReviews from './ratingsReviews';
import QuestionsAnswers from './questionsAnswers';
import RelatedItems from './relatedItems';

function App() {
  const rendered = useSelector((state) => state.modal.modalOpen);

  let appStyles = 'max-w-[950px] grid grid-flow-row auto-rows-max mx-auto bg-primary-100';
  let backgroundStyles = 'w-full h-full';

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  if (isDarkTheme) {
    appStyles += ' bg-secondary-100 text-gray-300';
    backgroundStyles += ' bg-gray-800';
    document.body.style.backgroundColor = '#1f2937';
  } else {
    appStyles += ' bg-primary-100 text-gray-700';
    backgroundStyles += ' bg-gray-300';
    document.body.style.backgroundColor = '#d1d5db';
  }

  return (
    <div className={isDarkTheme && 'dark'}>
      <div id="background" className={backgroundStyles}>
        <div id="app" className={appStyles}>
          <style>
            {`
            body::-webkit-scrollbar {
              width: 2vh;
              height: 2vh;
            }
            body::-webkit-scrollbar-thumb {
              background-color: rgb(97 32 216);
              border-radius: 6px;
            }
            body::-webkit-scrollbar-button {
              display: none;
            }
            body::-webkit-scrollbar-track {
              background-color: #e5f4ff;
              border-radius: 6px;
            }
            `}
          </style>
          <div className="row-span-1">
            <HeaderBar />
          </div>
          <div className="row-span-1">
            <ProductOverview />
          </div>
          <div className="row-span-1">
            <RatingsReviews />
          </div>
          <div className="row-span-1">
            <QuestionsAnswers />
          </div>
          <div className="row-span-1">
            <RelatedItems />
          </div>
          {rendered ? <Modal /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
