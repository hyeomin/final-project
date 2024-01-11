import React from 'react';
import Calendar from 'react-calendar';
import St from './style';
import { useState } from 'react';
import moment from 'moment';
// import { habitSticker } from '../../assets/habitSticker.jpg';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const HabitCalendar = ({ date }: any) => {
  // 초기값은 현재 날짜
  const [today, setToday] = useState<Value>(new Date());
  //클릭한 캘린더의 날짜를 알려줌
  const moment = require('moment');
  const onChangeToday = () => {
    setToday(today);
  };

  // const dayList = ['2024-01-01', '2024-01-04', '2024-01-05', '2024-01-09', '2024-01-11'];
  // // 각 날짜 타일에 컨텐츠 추가
  // // const addContent = ({ date }: any) => {
  //   // 해당 날짜(하루)에 추가할 컨텐츠의 배열
  //   const contents = [];

  //   // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
  //   if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
  //     contents.push(
  //       <React.Fragment >
  //         <img key={date} src={habitSticker} width="26" height="26" />
  //       </React.Fragment>
  //     );
  //   }
  // };

  return (
    <St.CalendarWrapper>
      <St.StyleCalendar>
        <Calendar onChange={onChangeToday} value={today} locale="en" calendarType="gregory" />
        {/* <div>{contents}</div> */}
        <div>{moment(today).format('YYYY년 MM월 DD일')}</div>
      </St.StyleCalendar>
    </St.CalendarWrapper>
  );
};

export default HabitCalendar;
