import Modal from "react-modal";

const ConsentModal = ({ isOpen, onRequestClose, onAgree, onDisagree }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Consent Modal"
      className="modal"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
    >
    <div className="consent-screen">
        <div className="consent-screen-header-section">
                <h2>Consent Agreement</h2>
                <h3>Please read the terms of use below.  Users must agree to these terms to use this service:</h3>
            </div>
            <div className="consent-screen-main-section">
                <h4>Users agree that they will not use this application for any illegal or illicit purposes, including, but not limited to:</h4>
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
                <p>
                This application utilizes OpenAI's services and users agree to comply with their terms of use, which can be found at <a href="https://openai.com/policies/usage-policies" target="_blank" rel="noopener noreferrer">https://openai.com/policies/usage-policies</a>
                </p>
            </div>
        
        <div className="welcome-modal-button-group">
            <button onClick={onAgree}>I Agree</button>
            <button onClick={onDisagree}>Back</button>
        </div>
    </div>
    </Modal>
  );
};

export default ConsentModal;
