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
          <p>Loading...</p>
        </div>
      </Modal>
    );
  };
  
  export default LoadingModal;