import React from 'react';
import Modal from '@modular/Modal';
import { useSelector } from 'react-redux';
import HeaderBar from './headerBar';
import ProductOverview from './productOverview';
import RatingsReviews from './ratingsReviews';
import QuestionsAnswers from './questionsAnswers';
import RelatedItems from './relatedItems';

const appStyles = 'max-w-[950px] grid grid-flow-row auto-rows-max mx-auto';

// const appStyles = 'grid grid-flow-row auto-rows-max mx-auto w-0 min-w-max';
// const appStyles = 'container min-w-max mx-auto';
function App() {
  const rendered = useSelector((state) => state.modal.modalOpen);
  return (
    <div id="app" className={appStyles}>
      I am the App div
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
  );
}

export default App;
