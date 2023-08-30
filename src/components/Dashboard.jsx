import React, {useEffect, useState} from "react";
import UserPrompt from "./UserPrompt";
import { db, auth } from "../../functions/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
    const collectionRef = collection(db, auth.currentUser.uid);
    const [plans, setPlans] = useState([])
    console.log(plans)
    useEffect(() => {
        getDocs(collectionRef)
            .then((snapshot) => {
                let currentPlans = []
                snapshot.docs.forEach((doc) => {
                    currentPlans.push({...doc.data()})
                })
                setPlans(currentPlans)
            })
            .catch(error => {
                console.log(error)

            })          
    },[])

    return (
        <>
            <div className="dashContainer">
                <div className="statsOuterContainer">
                    <div className="statsContainer">
                        <div className="statItem">
                            <h3>Plans Created</h3>
                            <div>{plans.length}</div>
                        </div>
                        <div className="statItem">
                            <h3>Plans Finished</h3>
                            <div>number #</div>
                        </div>
                        <div className="statItem">
                            <h3>Plans Open</h3>
                            <div>number #</div>
                        </div>
                    </div>
                    <div>Completion Ratio %</div>
                </div>
                <nav className="existingPlans">
                    <h2>Existing plans</h2>
                    <div>Plan 1</div>
                    <div>Plan 2</div>
                    <div>Plan 3</div>
                </nav>
            </div>
            <UserPrompt />
        </>
    )
}

export default Dashboard