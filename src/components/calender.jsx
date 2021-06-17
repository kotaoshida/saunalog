import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calender() {
  const value = ['2021-06-01', '2021-0-01'];

  return (
    <div>
      <Calendar

        value={value}
        calendarType="US"
      />
    </div>
  );
}

export default Calender