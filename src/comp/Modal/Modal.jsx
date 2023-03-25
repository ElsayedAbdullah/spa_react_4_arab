import './Modal.css';

function Modal({ children, closeModal, modalSubmit }) {
  return (
    <div
      className='modal-parent'
      onClick={() => {
        closeModal();
      }}
    >
      <form
        className={`modal`}
        onSubmit={modalSubmit}
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
