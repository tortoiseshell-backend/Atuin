import React from 'react';
import Modal from '@modular/Modal';
import { useSelector } from 'react-redux';
import ProductOverview from './productOverview';
import RatingsReviews from './ratingsReviews';
import QuestionsAnswers from './questionsAnswers';
import RelatedItems from './relatedItems';

const appStyles = 'max-w-[950px] grid grid-flow-row auto-rows-max mx-auto';

function App() {
  const rendered = useSelector((state) => state.modal.modalOpen);
  return (
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
      I am the App div
      <div className="row-span-1">
        Header here
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
  );
}

export default App;
