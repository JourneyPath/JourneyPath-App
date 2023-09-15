import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand } from '@fortawesome/free-solid-svg-icons';

const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <div className="error-modal">
      <div className="modal-content">
        {/* <h2>Error</h2> */}
        <p>{errorMessage}</p>
        <FontAwesomeIcon className='hand-icon' icon={faHand} />        
        <button onClick={onClose}>Go Back</button>
      </div>
    </div>
  );
};

export default ErrorModal;
2