import { useState } from 'react';
import axios from 'axios';

function EventScheduler() {
  const [message, setMessage] = useState('');

  const handleScheduleEvent = async () => {
    try {
      const response = await axios.get('/calendar/schedule_event');
      setMessage('Event scheduled');
      console.log(response.data);
    } catch (error) {
      setMessage('Error in scheduling event');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Event Scheduler</h1>
      <button onClick={handleScheduleEvent}>Schedule Event</button>
      <p>{message}</p>
    </div>
  );
}

export default EventScheduler;
