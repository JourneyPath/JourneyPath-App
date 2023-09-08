import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Calendar = (props) => {
    const { isAuthenticated, user } = props;
    console.log('Component is mounting'); // Add this line
    console.log('props in Calendar:', props)
    const [authUrl, setAuthUrl] = useState('');
    const [message, setMessage] = useState('');
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5000/calendar/authenticate');
            console.log('response**!', response); // Add this line
            const authUrl = response.data.authUrl;
            setAuthUrl(authUrl);
            // Open the Google OAuth2 URL in a new window or tab
            console.log('this is the authUrl: ', authUrl)
            
            window.open(authUrl, '_blank');
        } catch (error) {
            console.error('Error initiating Google OAuth2:', error.response?.data || error.message);
        }
    };

    console.log('authUrl: ', authUrl)
    
    // const handleGoogleAuth = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/calendar/authenticate');
    //         const authUrl = response.data.authUrl;
    //         // Redirect the user to the Google OAuth2 URL
    //         window.location.href = authUrl;
    //     } catch (error) {
    //         console.error('Error initiating Google OAuth2:', error.response?.data || error.message);
    //     }
    // };
    

    // useEffect(() => {
    //     // Define a function to fetch calendar events
    //     if (isAuthenticated && user) {
    //     const fetchCalendarEvents = async () => {
    //       try {
    //         console.log('****IN THE TRY***Fetching calendar events')
    //         const response = await axios.get('/calendar/fetch_calendar_events');
    //         console.log('Response from /calendar/fetch_calendar_events:', response)
    //         setEvents(response.data);
    //       } catch (error) {
    //         console.error('Error fetching calendar events:', error);
    //       }
    //     }; 
    //       fetchCalendarEvents();
    //     } else {
    //       console.log('You are not authorized!')
    //     }
    
    //     // Call the function to fetch calendar events
    //   }, [isAuthenticated, user]); // Ensure this effect runs only once

    // Function to schedule an event

    const fetchCalendarEvents = async () => {
              try {
                console.log('****IN THE TRY***Fetching calendar events')
                const response = await axios.get('http://localhost:5000/calendar/fetch_calendar_events');
                console.log('Response from /calendar/fetch_calendar_events:', response)
                setEvents(response.data);
              } catch (error) {
                console.error('Error fetching calendar events:', error);
              }
    }; 
 
     

  const scheduleEvent = async () => {
    try {
      const response = await axios.get('/calendar/schedule_event');
      setMessage(response.data);
    } catch (error) {
      console.error('Error scheduling event:', error);
    }
  };

    return (
        <div className="App">
          <h1>{`${props.user.displayName}'s Google Calendar`}</h1>
          {isAuthenticated ? (
            <div>
              <p>Click the following link to authorize your Google account:</p>
              <a href={authUrl}>Authorize with Google</a>
              <button onClick={fetchCalendarEvents}>Fetch Your Calendar</button>
            </div>
          ) : (
            <button onClick={handleGoogleAuth}>Authorize with Google</button>
          )}
    
          <div>
            {message && <p>{message}</p>}
            <button onClick={scheduleEvent}>Schedule Event</button>
          </div>
          <h1>Google Calendar Events</h1>
          <ul>
            {events.map((event) => (
              <li key={event.id}>{event.summary}</li>
            ))}
          </ul>    
        </div>
      );
}

export default Calendar;