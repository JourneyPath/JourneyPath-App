import React from "react";
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getFirestore, doc, setDoc } from "firebase/firestore";

const SaveButton = (props) => {
    const db = getFirestore(firebaseApp)
    console.log(props.user)

    const saveMessage = async (messageToSave) => {
        console.log(messageToSave)
        console.log(props.user)
        if (props.user) {
            await setDoc(doc(db, props.user.id, messageToSave.title), messageToSave);
        } else {
            console.log("you're not logged in!")
        }
    }

    return (
        <button onClick={() => saveMessage(props.theMessage)}>Save Action Plan</button>
    )
}

export default SaveButton