import React from "react";
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../../functions/firebaseConfig";

const SaveButton = (props) => {
    const db = getFirestore(firebaseApp)
    
    const saveMessage = async (messageToSave) => {
        console.log(messageToSave)
        if (auth.currentUser) {
            await setDoc(doc(db, auth.currentUser.uid, messageToSave.title), messageToSave);
        } else {
            console.log("you're not logged in!")
        }
    }

    return (
        <button onClick={() => saveMessage(props.message)}>Save Action Plan</button>
    )
}

export default SaveButton