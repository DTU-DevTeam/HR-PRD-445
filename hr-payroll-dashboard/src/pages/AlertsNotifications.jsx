import CalendarView from '../components/Calendar/CalendarView';

// AlertsNotifications.js
import React, { useState, useEffect } from 'react';


const AlertsNotifications = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Ví dụ fetch events từ API
    fetch('https://localhost:7151/Notification/Notifications')
      .then(res => res.json())
      .then(data => {
        const formattedEvents = data.map(event => ({
          title: event.title,
          start: new Date(event.startEvent),
          end: new Date(event.endEvent),
        }));
        console.log(formattedEvents);
        setEvents(formattedEvents);
      });
  }, []);

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Alerts & Notifications</h1>
      <div className="App">
        <CalendarView events={events} />
      </div>
    </div>
  );
};

export default AlertsNotifications;
