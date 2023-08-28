import React, { useState } from 'react';
import { useLocation } from 'react-router';
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        backgroundColor: '#FFFFFF',
        padding: 40,
    },
    centeredTitle: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    taskStep: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        textDecoration: 'underline',
    },
    actionItem: {
        marginLeft: 20,
    },
    content: {
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
    },
});

const ActionPlanPDF = ({ message }) => {

    const propertyLabels = {
        title: 'Project Title:',
        start_date: 'Project Start Date:',
        end_date: 'Project End Date:'
    };

    return (
        <PDFDownloadLink
            document={
                <Document>
                    <Page size="A4" style={styles.page}>
                        <Text style={styles.centeredTitle}>Action Plan</Text>
                        {Object.entries(message).map(([key, value], index) => (
                            <React.Fragment key={index}>
                                {key === 'tasks' ? (
                                    <React.Fragment>
                                        <Text style={styles.sectionHeading}>
                                            Tasks:
                                        </Text>
                                        {value.map((task, taskIndex) => (
                                            <React.Fragment key={taskIndex}>
                                                <Text style={styles.taskStep}>
                                                    Step {taskIndex + 1}:
                                                    {task.description}
                                                </Text>
                                                <Text style={styles.content}>
                                                    Start Date: {task.start_date}
                                                </Text>
                                                <Text style={styles.content}>
                                                    End Date: {task.end_date}
                                                </Text>
                                                {task.action_items &&
                                                    task.action_items.length > 0 && (
                                                        <React.Fragment>
                                                            <Text style={styles.content}>
                                                                Action Items:
                                                            </Text>
                                                            <ul>
                                                                {task.action_items.map((actionItem, actionIndex) => (
                                                                    <li key={actionIndex}>
                                                                        <Text style={styles.actionItem}>
                                                                            - {actionItem}
                                                                        </Text>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </React.Fragment>
                                                    )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Text style={styles.sectionHeading}>
                                            {propertyLabels[key]}
                                        </Text>
                                        <Text style={styles.text}>{value}</Text>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                    </Page>
                </Document>
            }
            fileName="action_plan.pdf"
        >
            {({ blob, url, loading, error }) =>
                loading ? 'Generating PDF...' : 'Download PDF'
            }
        </PDFDownloadLink>
    );
};


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
            <ActionPlanPDF message={message} />
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
                                                                {task.action_items.map((actionItem, actionIndex) => (
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
                                                                                    checked={completedItems[taskIndex]?.[actionIndex]}
                                                                                    // onChange={() =>
                                                                                    //   toggleItemCompletion(
                                                                                    //     taskIndex,
                                                                                    //     actionIndex
                                                                                    //   )
                                                                                    // }
                                                                                />
                                                                                <button
                                                                                    className="remove-button"
                                                                                    onClick={() => removeActionItem(taskIndex, actionIndex)}
                                                                                >
                                                                                    Remove Task
                                                                                </button>
                                                                            </div>
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

