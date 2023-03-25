/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@reducers/modalSlice';
import ImageTile from '@modular/ImageTile';
import NewReviewModal from '@components/ratingsReviews/subComponents/NewReviewModal';
import AddQForm from '@components/questionsAnswers/subComponents/AddQForm';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  backgroundColor: '#FFF',
  padding: '50px',
  boxShadow: '0px 0px 30px 5px rgba(0, 0, 0, 0.2)',
  maxWidth: '90vw',
  maxHeight: '95vh',
  borderRight: '0px',
};

const backdropStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: 9998,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

function Modal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.modalOpen);
  const ModalComponent = useSelector((state) => state.modal.componentType);
  const componentProps = useSelector((state) => state.modal.componentProps);

  function closeModal() {
    dispatch(toggle([null, []]));
  }

  if (!isOpen) {
    return null;
  }
  function renderComponent() {
    switch (ModalComponent) {
      case 'NewReviewModal': return <NewReviewModal />;
      case 'ImageTile': return <ImageTile photo={componentProps.photo} />;
      case 'AddQuestionForm': return <AddQForm />;
      // case '3': return <ComponentThree/>;
      // case '4': return <ComponentFour/>;
      default: return null;
    }
  }

  return (
    <>
      <div
        data-testid="modal"
        className="relative rounded-b-xl rounded-t-lg"
        style={{
          ...modalStyles, padding: '0px', paddingTop: '27px',
        }}
      >
        <button
          type="button"
          aria-label="Close Modal"
          onClick={closeModal}
          className="fa fa-window-close bg-inherent absolute top-0 right-0 focus:outline-none"
          style={{
            color: '#e30606',
            paddingRight: '4px',
            paddingTop: '2px',
            fontSize: '25px',
            transition: 'background-color 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            const { target } = e;
            target.style.color = '#9c0606';
          }}
          onMouseLeave={(e) => {
            const { target } = e;
            target.style.color = '#e30606';
          }}
        />
        <div style={{ borderTop: 'outset' }} />
        <div
          className="rounded-b-xl"
          style={{
            border: '.5',
            height: '99.5%',
            overflow: 'hidden',
            padding: '0px',
            borderRight: '0px',
          }}
        >
          <div data-testid="content" style={{ overflowY: 'auto', maxHeight: 'calc(95vh - 50px)' }}>
            {renderComponent()}
          </div>
        </div>
      </div>
      <button
        type="button"
        style={backdropStyles}
        onClick={closeModal}
        tabIndex={-1}
        aria-hidden="true"
      />
    </>
  );
}

export default Modal;
