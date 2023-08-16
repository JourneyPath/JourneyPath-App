import { useState, useEffect } from 'react';

const UserPrompt = () => {
    const [ value, setValue ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ previousChats, setPreviousChats ] = useState([])
    const [ currentTitle, setCurrentTitle ] = useState(null)
    
    const createNewChat = () => {
        setMessage(null)
        setValue('')
        setCurrentTitle(null)
    }

    const handleClick = (title) => {
        title.preventDefault()
        setCurrentTitle(title)
        setMessage(null)
        setValue('')
    }


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
            console.log('this is the response on the front', data)
            console.log('this is the data.choices', data.choices[0].message.content)
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
                        role: message.role,
                        content: message.content
                    }
                ]
        ))
        }
    }, [message, currentTitle])

    const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
    
  return (
    <div className="app">
        <section className='side-bar'>
            <button onClick={createNewChat}>+ New Chat</button>
            <ul className='history'>
                {uniqueTitles.map((title, index) => <li key={index} onClick={() => handleClick(title)}>{title}</li>)}
            </ul>
            <nav>
                <p>Made by the journeyPath team.</p>
            </nav>
        </section>

        <section className='main'>
            <h1>Get Started Here</h1>
            <ul className='feed'>
                {currentChat.map((chatMessage, index) => <li key={index}>
                    <p className='role'>{chatMessage.role}</p>
                    <p>{chatMessage.content}</p>
                </li> )}
            </ul>
            <div className='bottom-section'>
                <div className='input-container'>
                    <input className="prompt-input" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button id="submit" onClick={getMessages}>Submit</button>
                </div>
                <p className='info'>Powered by OpenAI ChatGPT 3.5-Turbo</p>
            </div>
        </section>
    
    </div>
  )
}

export default UserPrompt

