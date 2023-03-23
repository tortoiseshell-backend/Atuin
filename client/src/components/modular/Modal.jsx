import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@reducers/modalSlice';
import PropTypes from 'prop-types';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  backgroundColor: '#FFF',
  padding: '50px',
  borderRadius: '5px',
  boxShadow: '0px 0px 30px 5px rgba(0, 0, 0, 0.2)',
  width: '90%',
  height: '90%',
  maxWidth: '90%',
  maxHeight: '90%',
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

function Modal({ content }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.show);

  function closeModal() {
    dispatch(toggle());
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="relative"
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
        <div className="rounded-b-md" style={{ height: '99.5%', overflow: 'auto', padding: '20px' }}>
          {content}
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
Modal.propTypes = {
  content: PropTypes.element.isRequired,
};

export default Modal;
