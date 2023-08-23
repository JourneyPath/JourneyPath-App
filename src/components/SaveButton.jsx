import React from "react";
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getFirestore, doc, setDoc } from "firebase/firestore";

const SaveButton = (props) => {
    const db = getFirestore(firebaseApp)


    const saveMessage = async (messageToSave) => {
        console.log(messageToSave)
        await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          });
    }

    return (
        <button onClick={() => saveMessage(props.theMessage)}>Save Action Plan</button>
    )
}

export default SaveButton