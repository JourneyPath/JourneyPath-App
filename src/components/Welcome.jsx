import { useState } from "react";
import Modal from "react-modal";
import UserPrompt from "./UserPrompt";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Welcome = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  const openModal = () => {
    setShowPrompt(true);
  };

  const closeModal = () => {
    setShowPrompt(false);
  };

  return (
    <div className="welcome-container">
      <div className="welcome">
        <div className="welcome-headline">
          <h2>Welcome!</h2>
          <p>Let us find the path for your journey.</p>
        </div>
        <p className="welcome-about-script">
          hyperDrive plans is a tool to help you accomplish your goals.
          Utilizing AI, you can input who you are, what your goal is, your
          start date, and an end date, and then *voila!* you have a starting
          point in your beginning your journey to accomplish it!
        </p>
        <div className="startButton" onClick={openModal}>
          Let your journey begin!
        </div>
      </div>

        <Modal
            isOpen={showPrompt}
            onRequestClose={closeModal}
            contentLabel="User Prompt Modal"
            className="modal"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={true} 
            >
            <UserPrompt />
        </Modal>

    </div>
  );
};

export default Welcome;
