import React, { useState, useEffect } from 'react';
import './DigitalClock.css';
import { MeteoconsTimeMorningFill } from '../Timers/Meteocon-morning';
import { MeteoconsTimeAfternoonFill } from '../Timers/Meteocon-noon';
import { MeteoconsTimeLateAfternoonFill } from '../Timers/Meteocon-afternoon';
import { MeteoconsTimeEveningFill } from '../Timers/Meteocon-evening';
import { MeteoconsTimeNightFill } from '../Timers/Meteocon-night';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeIcon = (hours) => {
    const iconSize = 70;

    if (hours >= 1 && hours <= 10) {
      return <MeteoconsTimeMorningFill width={iconSize} height={iconSize} />;
    } else if (hours >= 11 && hours <= 12) {
      return <MeteoconsTimeAfternoonFill width={iconSize} height={iconSize} />;
    } else if (hours >= 13 && hours <= 18) {
      return <MeteoconsTimeLateAfternoonFill width={iconSize} height={iconSize} />;
    } else if (hours >= 19 && hours <= 21) {
      return <MeteoconsTimeEveningFill width={iconSize} height={iconSize} />;
    } else {
      return <MeteoconsTimeNightFill width={iconSize} height={iconSize} />;
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatFullDateTime = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const timeString = formatTime(date);
    const timeIcon = getTimeIcon(date.getHours());

    return (
      <>
        <span className="digital-icon">{timeIcon}</span>
        <span style={{ marginLeft: '-5px' }}>
          {dayName}, {day} {month} {year}
        </span>
        <span style={{ margin: '0 8px' }}></span>
        <span>{timeString}</span>
      </>
    );
  };

  return (
    <div className="digital-clock">
      <span>{formatFullDateTime(time)}</span>
    </div>
  );
};

export default DigitalClock;