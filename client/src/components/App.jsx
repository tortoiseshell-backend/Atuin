import React, { useEffect } from 'react';
import Modal from '@modular/Modal';
import { useSelector } from 'react-redux';
import HeaderBar from './headerBar';
import ProductOverview from './productOverview';
import RatingsReviews from './ratingsReviews';
import QuestionsAnswers from './questionsAnswers';
import RelatedItems from './relatedItems';

const appStyles = 'min-w-[390px] max-w-[950px] grid grid-flow-row auto-rows-max mx-auto shadow-sm'
+ ' bg-primary-100 text-gray-700 dark:bg-secondary-100 dark:text-gray-300';
const backgroundStyles = 'w-full h-full bg-slate-300 dark:bg-neutral-900';

function App() {
  const rendered = useSelector((state) => state.modal.modalOpen);

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  if (isDarkTheme) {
    document.body.style.backgroundColor = '#1f2937';
  } else {
    document.body.style.backgroundColor = '#d1d5db';
  }
  useEffect(() => {
    if (rendered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [rendered]);
  return (
    <div className={isDarkTheme ? 'dark' : ''}>
      <div id="background" className={backgroundStyles}>
        <div id="app" className={appStyles}>
          <style>
            {`
            body::-webkit-scrollbar {
              width: 1.5vh;
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
          <div className="row-span-1 mx-auto max-w-[500px] md:max-w-[950px]">
            <ProductOverview />
          </div>
          <div className="row-span-1 p-10 mx-auto max-w-[500px] md:max-w-[950px]">
            <RatingsReviews />
          </div>
          <div className="row-span-1 p-10 mx-auto max-w-[500px] md:max-w-[950px]">
            <QuestionsAnswers />
          </div>
          <div className="row-span-1 p-10 max-w-[500px] md:max-w-[950px]">
            <RelatedItems />
          </div>
          {rendered ? <Modal /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
