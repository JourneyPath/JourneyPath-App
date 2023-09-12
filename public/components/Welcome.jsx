import { useState } from "react"
import UserPrompt from "./UserPrompt"

const Welcome = () => {
   const [showPrompt, setShowPrompt] = useState(false)

    return (
        <div className="welcome-container">
            {showPrompt ? 
            <UserPrompt /> : 
            <div className="welcome">
                <h2>Welcome!</h2>
                <p>Let us find the path for your journey.</p>
                <div className="startButton" onClick={() => setShowPrompt(!showPrompt)}>Let your journey begin!</div> 
            </div>}
        </div>
    )
}

export default Welcome