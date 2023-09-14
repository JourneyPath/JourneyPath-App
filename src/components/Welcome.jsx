import { useState } from "react";
import Modal from "react-modal";
import UserPrompt from "./UserPrompt";
import ConsentModal from "./ConsentModal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Welcome = () => {
  const [showUserPrompt, setShowUserPrompt] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false); // State for the consent modal
  const [userConsent, setUserConsent] = useState(true); // Set userConsent to true by default

  const openConsentModal = () => {
    setShowConsentModal(true);
  };

  const closeConsentModal = () => {
    setShowConsentModal(false);
  };

  const openPromptModal = () => {
    if (userConsent) {
      setShowUserPrompt(true);
    }
  };

  const closePromptModal = () => {
    setShowUserPrompt(false);
  };

  const handleConsent = () => {
    setUserConsent(true); 
    openPromptModal();
    closeConsentModal();
  };

  const handleConsentDisagree = () => {
    closeConsentModal();
  };

  return (
    <div className="welcome-container">
      <div className="welcome">
      <h1> <span className="twinkle-text">Activate the hyperDrive and achieve your goals...</span></h1>
        <div className="welcome-headline"> 
          <h2>Welcome!</h2>
          <p className="welcome-about-script">
            hyperDrive is a tool to help you accomplish your goals.
            Utilizing AI, you can input who you are, what your goal is, your
            start date, and an end date, and then *voila!* you have a starting
            point to begin your journey and accomplish your goal!
          </p>
        </div>
        <div className="startButton" onClick={openConsentModal}>
          Click Here to Get Started
        </div>
      </div>

      <ConsentModal
        isOpen={showConsentModal}
        onRequestClose={closeConsentModal}
        onAgree={handleConsent}
        onDisagree={handleConsentDisagree}
      />

      <Modal
        isOpen={showUserPrompt}
        onRequestClose={closePromptModal}
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
