import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingModal from './LoadingModal';
import ErrorModal from './ErrorModal';
import ActionPlanMain from './ActionPlanMain';
import SaveButton from './SaveButton';
import { currentDate, currentTime } from '../../functions/date';

const UserPrompt = (props) => {
    const navigate = useNavigate();
    const [ hide, setHide] = useState(false)
    const [ value, setValue ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ parsedResponse, setParsedResponse ] = useState({})
    const [ role, setRole ] = useState('')
    const [ project, setProject ] = useState('')
    const [ startDate, setStartDate ] = useState('')
    const [ completionDate, setCompletionDate ] = useState('')
    const [ showModal, setShowModal ] = useState(false)
    const [loading, setLoading] = useState(false); 
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleNavigation = (messageData) => {
        navigate('/actionplan', { state: { message: messageData } });
      };

    const handleErrorMessageClose = () => {
        setShowErrorMessage(false);
      };

    const getMessages = async () => {
        setLoading(true); 
        setShowModal(true);
        
        const options = {
            method: 'POST',
            body: JSON.stringify({
                message: `Today's date is ${currentDate} at ${currentTime}.  You are a ${role}. You have been asked to create an action plan for ${project}. The start date is ${startDate} and the ${project} completion must be by ${completionDate}. Create an action plan and return your answer so that it can be easily imported into a calendar. I want the output to be in a parsable JSON format with a title, start date (date format: MM/DD/YYYY; time format: H:MM in 12 hour format), end date (date format: MM/DD/YYYY; time format: hours:minutes in 12 hour format), tasks with start and end dates and short task description with key action items for each task.`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        try {
            const response = await fetch('http://localhost:5000/completions', options);
        
            if (response.status === 400) {
                const errorData = await response.json(); 
                console.log('Error data:', errorData);
                const errorMessage = errorData.error;  
                setErrorMessage(errorMessage);
                setRole('');
                setProject('');
                setStartDate('');
                setCompletionDate('');
                setShowErrorMessage(true);
            } else if (response.ok) {
                const data = await response.json();
                console.log('this is the response on the front', data);
                const parsedResponseData = JSON.parse(data.choices[0].message.content);
                console.log('this is the parsedResponseData', parsedResponseData);
                setParsedResponse(parsedResponseData);
                setMessage(parsedResponseData);
                handleNavigation(parsedResponseData);
            } else {
                console.error('Server error');
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.error(error);
            setRole('');
            setProject('');
            setStartDate('');
            setCompletionDate('');
            setShowErrorMessage(true);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
        
        
        
        // try {
        //     const response = await fetch('http://localhost:5000/completions', options)
        //     const data = await response.json()
        //     console.log('this is the response on the front', data)
        //     // console.log('this is the data.choices', data.choices[0].message.content)
        //     const parsedResponseData = JSON.parse(data.choices[0].message.content)
        //     console.log('this is the parsedResponseData', parsedResponseData)
        //     setParsedResponse(parsedResponseData)
        //     setMessage(parsedResponseData)
        //     handleNavigation(parsedResponseData);
        // } catch (error) {
        //     console.error(error)
        // } finally {
        //     setLoading(false); 
        //     setShowModal(false);
        // }
    }


  return (
    <div className="user-prompt-parent-wrapper">
        <section className='user-prompt-main'>
            <h1 className='getting-started-header'>Create a New Plan</h1>


            <div className='user-prompt-bottom-section'>

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
                        placeholder="e.g. '6/21/2024', 'one week from today', today', etc."
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        type="text"
                    />
                    <label htmlFor="completionDateInput">Desired completion date</label>
                    <input
                        id="completionDateInput"
                        className="prompt-input"
                        placeholder="e.g. '12/31/2024', 'tomorrow', '38 days from now', etc."
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

        {showErrorMessage && (
          <ErrorModal
            errorMessage={errorMessage}
            onClose={handleErrorMessageClose}
          />
        )}

        {message ? (
            <ActionPlanMain
                messageFromComponentA={message} 
            />
        ) : (
            <div className="no-message"></div>
        )}
    </div>
  )
}

export default UserPrompt

