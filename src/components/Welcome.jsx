// import {Link} from "react-router-dom"
import UserPrompt from "./UserPrompt"

const Welcome = () => {
   

    return (
        <div className="welcome-container">
            <div className="welcome">
                <h2>Welcome!</h2>
                <p>Let us find the path for your journey.</p>
                <UserPrompt />
            </div>
            {/* <Link to='/actionplan' className="navLink center">Let your journey begin!</Link> */}
        </div>
    )
}

export default Welcome