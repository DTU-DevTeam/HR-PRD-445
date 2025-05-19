// MyCalendar.js
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import vi from 'date-fns/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-custom.css';

const locales = { vi };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const MyCalendar = ({ events }) => {
  return (
    <div style={{ height: 600, padding: '20px', backgroundColor: '#eef2f7', borderRadius: '12px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="vi"
        messages={{
          today: 'Hôm nay',
          previous: 'Trước',
          next: 'Tiếp',
          month: 'Tháng',
          week: 'Tuần',
          day: 'Ngày',
          agenda: 'Lịch trình',
        }}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default MyCalendar;
