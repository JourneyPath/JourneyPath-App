import React, {useEffect, useState} from "react";
import UserPrompt from "./UserPrompt";
import { db, auth } from "../../functions/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"

const Dashboard = () => {
    const collectionRef = collection(db, auth.currentUser.uid);
    const [plans, setPlans] = useState([])
    
    const getPlans = () => {
        plans.length? plans.map((plan,idx) => {
            return (
                <div key={idx}>{plan.title}</div>
            )
        })
        : <div>You have no plans, create one!</div>
    }

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
                            <p className="planStat">{plans.length}</p>
                        </div>
                        <div className="statItem">
                            <h3>Plans Finished</h3>
                            <div className="planStat">PH</div>
                        </div>
                        <div className="statItem">
                            <h3>Plans Open</h3>
                            <div className="planStat">PH</div>
                        </div>
                    </div>
                    <div>Completion Ratio %</div>
                </div>
                <nav className="existingPlans">
                    <h2>Existing plans</h2>
                    {plans.length? plans.map((plan,idx) => {
                        return (
                            <Link to='/actionplan' state={{ message: plan }} key={idx} className="planButton">{plan.title}</Link>
                        )
                    })
                    : <div>You have no plans, create one!</div>}
                </nav>
            </div>
            <UserPrompt />
        </>
    )
}

export default Dashboard