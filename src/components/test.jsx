import React from 'react';

const Test = () => {
  

  const generateGoogleCalendarLink = () => {
    const  event  = {
        summary: 'Sample Event',
        location: 'Event Location',
        description: 'Event Description',
        start: new Date('2023-09-01T10:00:00'),
        end: new Date('2023-09-01T11:00:00'),
      }

    // Convert event details to ICAL format
    const icalString = `
      BEGIN:VCALENDAR
      BEGIN:VEVENT
      SUMMARY:${event.summary}
      LOCATION:${event.location}
      DESCRIPTION:${event.description}
      DTSTART:${event.start.toISOString().replace(/-|:|\.\d+/g, '')}
      DTEND:${event.end.toISOString().replace(/-|:|\.\d+/g, '')}
      END:VEVENT
      END:VCALENDAR
    `;

    // Encode the ICAL string
    const encodedIcalString = encodeURIComponent(icalString);

    // Create the ICAL link
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedIcalString}`;

    return googleCalendarUrl;
  }
    const googleCalendarUrl = generateGoogleCalendarLink();

    return (
      <div>
        <h2>Add Event to Google Calendar</h2>
        <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
          <button>Add to Google Calendar</button>
        </a>
      </div>
    );
  }


export default Test;