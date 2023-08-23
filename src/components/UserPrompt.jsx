import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingModal from './LoadingModal';
import ActionPlanMain from './ActionPlanMain';

const UserPrompt = () => {
    const navigate = useNavigate();
    const [ value, setValue ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ parsedResponse, setParsedResponse ] = useState({})
    const [ role, setRole ] = useState('')
    const [ project, setProject ] = useState('')
    const [ startDate, setStartDate ] = useState('')
    const [ completionDate, setCompletionDate ] = useState('')
    const [ showModal, setShowModal ] = useState(false)
    const [loading, setLoading] = useState(false); 

    const handleNavigation = () => {
        console.log('handleNavigation is firing')
        navigate('/actionplan');
      };

    const getMessages = async () => {
        setLoading(true); 
        setShowModal(true);
        
        const options = {
            method: 'POST',
            body: JSON.stringify({
                message: `You are a ${role}. You have been asked to create an action plan for ${project}. The start date is ${startDate} and the ${project} completion must be by ${completionDate}. Create an action plan and return your answer so that it can be easily imported into a calendar. I want the output to be in a parsable JSON format with a title, start date, end date, tasks with start and end dates and short task description with key action items for each task.`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // const options = {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         message: value
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        try {
            const response = await fetch('http://localhost:5000/completions', options)
            const data = await response.json()
            console.log('this is the response on the front', data)
            console.log('this is the data.choices', data.choices[0].message.content)
            const parsedResponseData = JSON.parse(data.choices[0].message.content)
            // console.log('this is the parsed response', parsedResponseData)
            setParsedResponse(parsedResponseData)
            setMessage(parsedResponseData)
            // setMessage(data.choices[0].message.content)
            navigate('/actionplan')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false); 
            setShowModal(false);
        }
    }

  return (
    <div className="app">
        <section className='main'>
            <h1 className='getting-started-header'>Get Started Here</h1>

            <div className='bottom-section'>
                {/* <div className='input-container'>
                    <input className="prompt-input" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button id="submit" onClick={getMessages}>
                        
                    </button>
                </div> */}

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
                placeholder="e.g. 'launch a new product', 'write a book', etc."
                value={project}
                onChange={(e) => setProject(e.target.value)}
                type="text"
            />
            <label htmlFor="startDateInput">Desired start date</label>
            <input
                id="startDateInput"
                className="prompt-input"
                placeholder="MM/DD/YYYY"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="text"
            />
            <label htmlFor="completionDateInput">Desired completion date</label>
            <input
                id="completionDateInput"
                className="prompt-input"
                placeholder="e.g. '12/31/2024', 'one week from today', etc."
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                type="text"
            />
            <button id="submit" onClick={getMessages}>
                {loading ? 'Loading...' : 'Submit'}
            </button>
            </div>
                <p className='info'>Powered by OpenAI ChatGPT 3.5-Turbo</p>
            </div>
        </section>
        
        <LoadingModal isOpen={showModal} />
        {showModal && (
            <div className="loading-modal">
                <div className="loading-spinner"></div>
            </div>
        )}

        {message ? (
            <ActionPlanMain
                messageFromComponentA={message} // Pass the message state as a prop
            />
        ) : (
            <div className="no-message"></div>
        )}
    </div>
  )
}

export default UserPrompt

