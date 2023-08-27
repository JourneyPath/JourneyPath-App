import { useState } from 'react';
import { useLocation } from 'react-router';

const ActionPlanMain = ({ message: propMessage }) => {
    const location = useLocation();    
    const message = location.state && location.state.message;

    const [completedItems, setCompletedItems] = useState({});
    const [showActionItemsMap, setShowActionItemsMap] = useState({});
   
    const propertyLabels = {
        title: 'Project Title:',
        start_date: 'Project Start Date:',
        end_date: 'Project End Date:'
    };
    
    // const toggleItemCompletion = (taskIndex, actionIndex) => {
    //     setCompletedItems((prevState) => {
    //         const newState = { ...prevState };
    //         newState[taskIndex] = newState[taskIndex] || {};
    //         newState[taskIndex][actionIndex] = !newState[taskIndex][actionIndex];
    //         return newState;
    //     });
    // };

    const toggleShowActionItems = (taskIndex) => {
        setShowActionItemsMap((prevState) => ({
            ...prevState,
            [taskIndex]: !prevState[taskIndex],
        }));
    };

    const removeActionItem = (taskIndex, actionIndex) => {
        setCompletedItems((prevState) => {
            const newState = { ...prevState };
            if (newState[taskIndex]) {
                delete newState[taskIndex][actionIndex];
                if (Object.keys(newState[taskIndex]).length === 0) {
                    delete newState[taskIndex];
                }
            }
            return newState;
        });
    };

    return (
        <div className="app">
            <h1>Action Plan</h1>
            <ul className="feed">
                {message &&
                    Object.entries(message).map(([key, value], index) => (
                        <li key={index}>
                            {key === 'tasks' ? (
                                <div className="task-wrapper-main">
                                    <p className="role">Tasks:</p>
                                    <ul className="task-wrapper-ul">
                                        {value.map((task, taskIndex) => (
                                            <li key={taskIndex} className="task-wrapper-li">
                                                <div className="task-wrapper">
                                                    <p>Step {taskIndex + 1}: {task.description}</p>
                                                    <p>Start Date: {task.start_date}</p>
                                                    <p>End Date: {task.end_date}</p>

                                                    <button className='toggle-button' onClick={() => toggleShowActionItems(taskIndex)}>
                                                        {showActionItemsMap[taskIndex] ? '▼' : '▶'}
                                                    </button>

                                                    {showActionItemsMap[taskIndex] &&
                                                        task.action_items &&
                                                        task.action_items.length > 0 && (
                                                            <ul>
                                                                {task.action_items.map((actionItem, actionIndex) => (
                                                                    <li key={actionIndex}>
                                                                        <div className="action-item-wrapper">
                                                                            <p>Action Item: {actionItem}</p>
                                                                            <div>
                                                                                Completed?
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`action-item-${taskIndex}-${actionIndex}`}
                                                                                    name={`action-item-${taskIndex}-${actionIndex}`}
                                                                                    checked={
                                                                                        completedItems[taskIndex]?.[actionIndex]
                                                                                    }
                                                                                    // onChange={() =>
                                                                                    //     toggleItemCompletion(
                                                                                    //         taskIndex,
                                                                                    //         actionIndex
                                                                                    //     )
                                                                                    // }
                                                                                />
                                                                            </div>
                                                                           <button onClick={() => removeActionItem(taskIndex, actionIndex)}>Remove Task</button>
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
                                    <p className="role">{propertyLabels[key]}</p>
                                    <p>{value}</p>
                                </div>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default ActionPlanMain;

