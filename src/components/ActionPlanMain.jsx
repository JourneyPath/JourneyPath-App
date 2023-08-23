import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const ActionPlanMain = ({ message: propMessage }) => {
    const [ value, setValue ] = useState('')
    const location = useLocation();    
    const message = location.state && location.state.message;
    // const [ message, setMessage ] = useState(null)
    // const [ previousChats, setPreviousChats ] = useState([])
    // const [ currentTitle, setCurrentTitle ] = useState(null)
    // const [ parsedResponse, setParsedResponse ] = useState({})
    
    console.log('props', message)
    // const createNewChat = () => {
    //     setMessage(null)
    //     setValue('')
    //     setCurrentTitle(null)
    // }

    // const handleClick = (title) => {
    //     title.preventDefault()
    //     setCurrentTitle(title)
    //     setMessage(null)
    //     setValue('')
    // }


    // const getMessages = async () => {

    //     // const options = {
    //     //     method: 'POST',
    //     //     body: JSON.stringify({
    //     //         message: `You are a ${role} at a car dealership. You have been asked to create an action plan for launching a new model. The start date is 7/4/23 and the new model launch date is 7/4/24. Create an action plan and return your answer so that it can be easily imported into a calendar. I want the output to be in a parsable JSON format with a title, start date, end date, tasks with start and end dates and short task description with key action items for each task.`
    //     //     }),
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     }
    //     // }
    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             message: value
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }

    //     try {
    //         const response = await fetch('http://localhost:5000/completions', options)
    //         const data = await response.json()
    //         console.log('this is the response on the front', data)
    //         console.log('this is the data.choices', data.choices[0].message.content)
    //         const parsedResponseData = JSON.parse(data.choices[0].message.content)
    //         console.log('this is the parsed response', parsedResponseData)
    //         // setMessage(data.choices[0].message)
    //         setParsedResponse(parsedResponseData)
    //         setMessage(parsedResponseData)

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // useEffect(() => {
    //     if(!currentTitle && value && message) {
    //         setCurrentTitle(value)
    //     }
    //     if(currentTitle && value && message) {
    //         setPreviousChats(prevChats => (
    //             [...prevChats, 
    //                 {
    //                     title: currentTitle, 
    //                     role: 'user',
    //                     content: value
    //                 }, 
                    
    //                 {
    //                     title: currentTitle, 
    //                     role: message.role,
    //                     content: message.content
    //                 }
    //             ]
    //     ))
    //     }
    // }, [message, currentTitle])

    // // const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
    // // const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

    const propertyLabels = {
        title: 'Project Title:',
        start_date: 'Project Start Date:',
        end_date: 'Project End Date:'
    };
    
  return (
    <div className="app">
        <h1>Action Plan</h1>
        {/* <h2>Props: {props.messageFromComponentA}</h2> */}
        <ul className='feed'>
            {message && Object.entries(message).map(([key, value], index) => (
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
    </div>
  )
}

export default ActionPlanMain

