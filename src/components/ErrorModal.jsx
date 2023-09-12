const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <div className="error-modal">
      <div className="modal-content">
        {/* <h2>Error</h2> */}
        <p>{errorMessage}</p>
        <button onClick={onClose}>Go Back</button>
      </div>
    </div>
  );
};

export default ErrorModal;
2