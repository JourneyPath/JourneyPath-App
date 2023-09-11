import { useState } from "react";
import Modal from "react-modal";
import UserPrompt from "./UserPrompt";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Welcome = () => {
  const [showPrompt, setShowPrompt] = useState(false);
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
      setShowPrompt(true);
    }
  };

  const closePromptModal = () => {
    setShowPrompt(false);
  };

  const handleConsent = () => {
    setUserConsent(true); // Set userConsent to true when the user agrees
    // Open the prompt modal only if the user has given consent
    openPromptModal();
    // Close the consent modal after opening the prompt modal
    closeConsentModal();
  };
  const handleConsentDisagree = () => {
    // setUserConsent(false); // Set userConsent to true when the user agrees
    // // Close the consent modal
    closeConsentModal();
    // Open the prompt modal only if the user has given consent
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
          point to begin your journey and accomplish your goal!
        </p>
        <div className="startButton" onClick={openConsentModal}>
          Ready to begin your journey? Click Here!
        </div>
      </div>

      <Modal
        isOpen={showConsentModal}
        onRequestClose={closeConsentModal}
        contentLabel="Consent Modal"
        className="modal"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true} 
      >
        <div className="consent-screen">
        <h3>Consent Agreement</h3>
          <p>Please read and accept the terms and conditions before proceeding:</p>
          <ul>
            <li>Users agree that they will not use this application for any illegal purposes, including, but not limited to:</li>
            <ul>
              <li>Child Sexual Abuse Material or any content that exploits or harms children</li>
              <li>Generation of hateful, harassing, or violent content</li>
              <li>Generation of malware</li>
              <li>Activity that has a high risk of physical harm or death</li>
              <li>Activity that has a high risk of economic harm</li>
              <li>Activity that violates any law or regulation</li>
              <li>Activity that violates any third-party rights, such as intellectual property, privacy, and publicity rights</li>
              <li>Fraudulent or deceptive activity</li>
              <li>Adult content, adult industries, and dating apps</li>
              <li>Political campaigning or lobbying</li>
              <li>Activity that violates people’s privacy</li>
              <li>Engaging in the unauthorized practice of law, or offering tailored legal advice without a qualified person reviewing the information</li>
              <li>Offering tailored financial advice without a qualified person reviewing the information</li>
              <li>Telling someone that they have or do not have a certain health condition, or providing instructions on how to cure or treat a health condition</li>
              <li>High-risk government decision-making</li>
            </ul>
            <li>This application utilizes OpenAI's Services and users agree to comply with their terms of use, which can be found at <a href="https://openai.com/policies/usage-policies" target="_blank" rel="noopener noreferrer">https://openai.com/policies/usage-policies</a></li>
          </ul>
          {/* Add your consent content here */}
          <button onClick={handleConsent}>I Agree</button>
          <button onClick={handleConsentDisagree}>Back</button>
        </div>
      </Modal>

      <Modal
        isOpen={showPrompt}
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
