import './Modal.css';

function Modal({ children, closeModal }) {
  return (
    <div className='modal-parent' onClick={closeModal}>
      <form
        className={`modal`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className='close'
          onClick={() => {
            closeModal();
          }}
        >
          <i className='fa-solid fa-xmark'></i>
        </div>
        {children}
      </form>
    </div>
  );
}

export default Modal;
