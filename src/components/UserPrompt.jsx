import { useState, useEffect } from 'react';
import sampleData from './sampleData';
import SaveButton from './SaveButton';

const UserPrompt = (props) => {
    const [ hide, setHide] = useState(false)
    const [ value, setValue ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ sampleMessasge, setSampleMessasge ] = useState("sampleData")
    const [ previousChats, setPreviousChats ] = useState([])
    const [ currentTitle, setCurrentTitle ] = useState(null)
    const [ parsedResponse, setParsedResponse ] = useState({})
    const [ role, setRole ] = useState('')
    const [ project, setProject ] = useState('')
    const [ startDate, setStartDate ] = useState('')
    const [ completionDate, setCompletionDate ] = useState('')
    
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

        // const options = {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         message: `You are a ${role} at a car dealership. You have been asked to create an action plan for launching a new model. The start date is 7/4/23 and the new model launch date is 7/4/24. Create an action plan and return your answer so that it can be easily imported into a calendar. I want the output to be in a parsable JSON format with a title, start date, end date, tasks with start and end dates and short task description with key action items for each task.`
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
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
            const parsedResponseData = JSON.parse(data.choices[0].message.content)
            console.log('this is the parsed response', parsedResponseData)
            // setMessage(data.choices[0].message)
            setParsedResponse(parsedResponseData)
            setMessage(parsedResponseData)

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

    // const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

    const propertyLabels = {
        title: 'Project Title:',
        start_date: 'Project Start Date:',
        end_date: 'Project End Date:'
    };
    console.log(props, props.user)
  return (
    <div className="app">
        <section className='side-bar'>
            <button onClick={(createNewChat)}>+ New Chat</button>
            <ul className='history'>
                {uniqueTitles.map((title, index) => <li key={index} onClick={() => handleClick(title)}>{title}</li>)}
            </ul>
            <nav>
                <p>Made by the journeyPath team.</p>
            </nav>
        </section>
 
        <section className='main'>
                <h1>Get Started Here</h1>
                <SaveButton theMessage={sampleMessasge} user={props.user}/>
                <button onClick={() => setHide(!hide)}>Hide prompt</button>
                <ul className='feed'>
                {Object.entries(parsedResponse).map(([key, value], index) => (
                    <li key={index}>
                        {key === 'tasks' ? (
                            <div>
                                <p className='role'>Tasks:</p>
                                <ul>
                                    {value.map((task, taskIndex) => (
                                        <li key={taskIndex}>
                                            <div className='task-wrapper'>
                                                <p>Title: {task.title}</p>
                                                <p>Description: {task.description}</p>
                                                <p>Start Date: {task.start_date}</p>
                                                <p>End Date: {task.end_date}</p>

                                                {task.action_items && task.action_items.length > 0 && (
                                                    <ul>
                                                        {task.action_items.map((actionItem, actionIndex) => (
                                                            <li key={actionIndex}>
                                                                <div className='action-item-wrapper'>
                                                                    <p>Action Item: {actionItem}</p>
                                                                    <div>
                                                                        Completed?<input type="checkbox" id="action-item" name="action-item" value="action-item"/>
                                                                    </div>
                                                                    <button>Remove Task</button> 
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <p className='role'>{propertyLabels[key]}</p>
                                <p>{value}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {hide? <div>prompt hidden</div>:
            <div className='bottom-section'>
                <div className='input-container'>
                    <input className="prompt-input" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button id="submit" onClick={getMessages}>Submit</button>
                </div>
                <div className="input-container">
                    <label htmlFor="roleInput">What is your Role?</label>
                    <input
                        id="roleInput"
                        className="prompt-input"
                        placeholder="e.g. 'retail manager', 'college student', 'actor', etc."
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        type="text"
                    />
                    <label htmlFor="projectInput">Your project or goal</label>
                    <input
                        id="projectInput"
                        className="prompt-input"
                        placeholder="Your project or goal"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        type="text"
                    />
                    <label htmlFor="startDateInput">Desired start date</label>
                    <input
                        id="startDateInput"
                        className="prompt-input"
                        placeholder="Desired start date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        type="text"
                    />
                    <label htmlFor="completionDateInput">Desired completion date</label>
                    <input
                        id="completionDateInput"
                        className="prompt-input"
                        placeholder="Desired completion date"
                        value={completionDate}
                        onChange={(e) => setCompletionDate(e.target.value)}
                        type="text"
                    />
                    <button id="submit" onClick={getMessages}>
                        Submit
                    </button>
                </div>
                    <p className='info'>Powered by OpenAI ChatGPT 3.5-Turbo</p>
            </div>}
        </section>
    </div>
  )
}

export default UserPrompt

