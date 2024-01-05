import React from 'react';
import Calendar from 'react-calendar';
import St from './style';
import { useState } from 'react';
import moment from 'moment';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const HabitCalendar = () => {
  // 초기값은 현재 날짜
  const [today, setToday] = useState<Value>(new Date());

  const onChangeToday = () => {
    setToday(today);
  };

  return (
    <St.CalendarWrapper>
      <St.StyleCalendar>
        <Calendar onChange={onChangeToday} value={today} locale="en" calendarType="gregory" />
        {/* <div>{moment(today).format('YYYY년 MM월 DD일')}</div> */}
      </St.StyleCalendar>
    </St.CalendarWrapper>
  );
};

export default HabitCalendar;
