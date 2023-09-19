import { useState } from "react";
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../../functions/firebaseConfig";

const SaveButton = (props) => {
    const db = getFirestore(firebaseApp);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const saveMessage = async (messageToSave) => {
        console.log(messageToSave);
        if (auth.currentUser) {
            await setDoc(doc(db, auth.currentUser.uid, messageToSave.title), messageToSave);
        } else {
            console.log("You're not logged in!");
        }
    }

    const handleSaveButtonClick = () => {
        saveMessage(props.message);
        setIsSaveModalOpen(true);
    }

    return (
        <div>
            <button onClick={handleSaveButtonClick}className="save-action-button">Save Action Plan</button>
            {isSaveModalOpen && (
                <div className="saveModal">
                    <div className="saveModal-content">
                        <p>Your plan has been saved and can be found in your dashboard!</p>
                        <button onClick={() => setIsSaveModalOpen(false)}>Ok</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SaveButton;