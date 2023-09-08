import { useState } from 'react';
import { useLocation } from 'react-router';
import ActionPlanPDF from './PDFCreator';
import { currentDate, currentTime } from '../../functions/date';
import SaveButton from './SaveButton';
import EventScheduler from './EventScheduler';

const ActionPlanMain = ({ message: plan }) => {
    const location = useLocation();    
    const message = location.state && location.state.message;
    // console.log('currentDate: ', currentDate);
    // console.log('currentTime: ', currentTime);
    console.log(message)
    const [showActionItemsMap, setShowActionItemsMap] = useState({});
    const [removedActionItems, setRemovedActionItems] = useState([]);
   
    const propertyLabels = {
        title: 'Project Title:',
        start_date: 'Project Start Date:',
        end_date: 'Project End Date:'
    };
    
    const toggleShowActionItems = (taskIndex) => {
        setShowActionItemsMap((prevState) => ({
            ...prevState,
            [taskIndex]: !prevState[taskIndex],
        }));
    };

    const removeActionItem = (taskIndex, actionIndex) => {
        setRemovedActionItems([...removedActionItems, { taskIndex, actionIndex }]);
    };

    return (
        <div className="app">
            <h1>Action Plan</h1>
            <ActionPlanPDF message={message} />
            <SaveButton message={message}/>
            <EventScheduler message={message}/>
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
                                                    <h3 className='task-header'>Step {taskIndex + 1}: {task.description}</h3>
                                                    <p>Start Date: {task.start_date}</p>
                                                    <p>End Date: {task.end_date}</p>

                                                    <button className='toggle-button' onClick={() => toggleShowActionItems(taskIndex)}>
                                                        {showActionItemsMap[taskIndex] ? '▼' : '▶'}
                                                    </button>

                                                    {showActionItemsMap[taskIndex] &&
                                                        task.action_items &&
                                                        task.action_items.length > 0 && (
                                                            <ul>
                                                                {task.action_items.map((actionItem, actionIndex) => {
                                                                    const isRemoved = removedActionItems.some(
                                                                        (removedItem) =>
                                                                            removedItem.taskIndex === taskIndex &&
                                                                            removedItem.actionIndex === actionIndex
                                                                    );

                                                                    if (isRemoved) {
                                                                        return null; 
                                                                    }

                                                                    return (
                                                                        <li key={actionIndex}>
                                                                            <div className="action-item-wrapper">
                                                                                <p>Action Item: {actionItem}</p>
                                                                                <div className="tasks-button-group">
                                                                                    <label className="checkbox-label" htmlFor={`action-item-${taskIndex}-${actionIndex}`}>
                                                                                        Completed?
                                                                                    </label>
                                                                                    <input
                                                                                        className="checkbox-input"
                                                                                        type="checkbox"
                                                                                        id={`action-item-${taskIndex}-${actionIndex}`}
                                                                                        name={`action-item-${taskIndex}-${actionIndex}`}
                                                                                    />
                                                                                    <button
                                                                                        className="remove-button"
                                                                                        onClick={() => removeActionItem(taskIndex, actionIndex)}
                                                                                    >
                                                                                        Remove Item
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                })}
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

