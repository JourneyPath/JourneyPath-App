import React from "react";
import UserPrompt from "./UserPrompt";

const Dashboard = (props) => {

    return (
        <>
            <div className="dashContainer">
                <div className="statsOuterContainer">
                    <div className="statsContainer">
                        <div className="statItem">
                            <h3>Plans Created</h3>
                            <div>number #</div>
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