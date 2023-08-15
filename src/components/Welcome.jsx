import React from "react";
import { useState, useEffect } from "react";


const Welcome = () => {
    const [ value, setValue ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ previousChats, setPreviousChats ] = useState([])
    const [ currentTitle, setCurrentTitle ] = useState(null)


    const getMessages = async () => {

        const options = {
            method: 'POST',
            body: JSON.stringify({
                message: value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch('http://localhost:5000/completions', options)
            const data = await response.json()
            console.log(data)
            setMessage(data.choices[0].message)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if(!currentTitle && value && message) {
            setCurrentTitle(value)
        }
        if(currentTitle && value && message) {
            setPreviousChats(prevChats => (
                [...prevChats, 
                    {
                        title: currentTitle, 
                        role: 'user',
                        content: value
                    }, 
                    
                    {
                        title: currentTitle, 
                        role: 'user',
                        content: message.content
                    }
                ]
        ))
        }
    }, [message, currentTitle])

    return (
        <div>
            <div>
                Welcome! your journey is under construction!
            </div>
            <div className="input-container">
                <input value={value} onChange={(e) => setValue(e.target.value)}/>
                <button id="submit" onClick={getMessages}>Submit</button>
            </div>
        </div>
    )
}

export default Welcome