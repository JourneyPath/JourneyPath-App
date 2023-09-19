import Modal from 'react-modal';

const LoadingModal = ({ isOpen }) => {
    return (
      <Modal
        isOpen={isOpen}
        contentLabel="Loading Modal"
        className="loading-modal"
        overlayClassName="loading-modal-overlay"
      >
        <div className="modal-content">
          <p>Loading...This takes a minute, so please be patient while we create your tailored plan!</p>
        </div>
      </Modal>
    );
  };
  
  export default LoadingModal;