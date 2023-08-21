import React from 'react'
import {Link} from "react-router-dom"

const Welcome = () => {
   

    return (
        <div className="container">
            <div className="welcome">
                <h2>Welcome!</h2>
                <p>Let us find the path for your journey.</p>
            </div>
            <Link to='/actionplan' className="navLink center">Let your journey begin!</Link>
        </div>
    )
}

export default Welcome