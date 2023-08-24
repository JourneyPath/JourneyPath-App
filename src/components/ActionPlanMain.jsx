
// import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const ActionPlanMain = ({ message: propMessage }) => {
    // const [ value, setValue ] = useState('')
    const location = useLocation();    
    const message = location.state && location.state.message;
    // console.log('props', message)
   
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

