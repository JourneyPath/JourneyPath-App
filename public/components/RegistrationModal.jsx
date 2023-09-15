const RegistrationModal = ({ isOpen, onClose, message }) => {
  return (
    isOpen && (
      <div className="registration-modal">
        <div className="registration-modal-content">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
};

export default RegistrationModal;
