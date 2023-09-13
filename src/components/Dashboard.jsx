import React, {useEffect, useState} from "react";
import UserPrompt from "./UserPrompt";
import { db, auth } from "../../functions/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"

const Dashboard = (props) => {
    const [plans, setPlans] = useState([])
    //const [finished, setFinished] = useState([])
    
   
    let finished = plans.map((plan) =>{
        return plan.tasks.map(task => {
        return task.action_items.every((actionItem) => actionItem.completed)
        }).every(plan => plan === true) ? 1: 0
    }).reduce((t,c) => t = t + c,0)

    let openPlans = plans.length - finished
    
    useEffect(() => {
        
        if(props.uId) {
            const collectionRef = collection(db, props.uId);
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
        }
    },[props.uId])

    return (
        <>
            <div className="dashBoard">
                <div className="dashContainer">
                    <div className="statsOuterContainer">
                        <div className="statsContainer">
                            <div className="statItem">
                                <h3>Plans Created</h3>
                                <p className="planStat">{plans.length}</p>
                            </div>
                            <div className="statItem">
                                <h3>Plans Finished</h3>
                                <div className="planStat">{finished}</div>
                            </div>
                            <div className="statItem">
                                <h3>Plans Open</h3>
                                <div className="planStat">{openPlans}</div>
                            </div>
                        </div>
                        <div>Completion Ratio {Math.round((finished/plans.length)*100)}%</div>
                    </div>
                    <nav className="existingPlans">
                        <h2>Existing plans</h2>
                        {plans.length? plans.map((plan,idx) => {
                            const completionPercentage = Math.round(plan.tasks.reduce((total, task) => {
                                return (
                                    total +
                                    task.action_items.reduce((taskTotal, actionItem) => {
                                    return taskTotal + (actionItem.completed ? 1 : 0);
                                    }, 0)
                                );
                                }, 0)/plan.tasks.reduce((total, task) => total +
                                task.action_items.length,0)* 100)
                            return (
                                <Link to='/actionplan' state={{ message: plan }} key={idx} className="planButton">
                                    {completionPercentage}% {plan.title}
                                    <div style={{ width:`${completionPercentage}%`}} className="planButtonContent"></div>
                                </Link>
                            )
                        })
                        : <div>You have no plans, create one!</div>}
                    </nav>
                </div>
            <UserPrompt />
            </div>
        </>
    )
}

export default Dashboard