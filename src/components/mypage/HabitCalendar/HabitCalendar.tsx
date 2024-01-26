import React, { useRef } from 'react';
import Calendar from 'react-calendar';
import St from './style';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { QUERY_KEYS } from '../../../query/keys';
import { getMyPosts } from '../../../api/myPostAPI';
import { useQuery } from '@tanstack/react-query';
import mangofavicon from '../../../assets/mango-favicon.png';
import calendarSpring from '../../../assets/calendarSpring.png';
import { getFormattedDateCustom } from '../../../util/formattedDateAndTime';

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

  const { data } = useQuery({
    queryKey: ['posts', { isMyPosts: true }],
    queryFn: getMyPosts
  });
  const createdAtList = data ? data.map((data) => getFormattedDateCustom(data.createdAt!)) : [];
  // console.log('data', data);
  const dayList: string[] = [];

  const getElCount = (arr: string[]): Record<string, number> =>
    arr.reduce((ac: Record<string, number>, v) => {
      ac[v] = (ac[v] || 0) + 1;
      return ac;
    }, {});
  const dayCount = getElCount(createdAtList);

  return (
    <St.CalendarWrapper>
      <St.StyleCalendar>
        <St.CalendarContainer>
          <St.CalendarIntroduce>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={mangofavicon} alt="mago-Logo" />
              <span>망고 달력</span>
            </div>

            <br />
            <div>
              <p>오늘도 지구를 지키기 위해 노력하셨군요</p>
              <br />
              <p>글을 쓰면 망고스티커를 드려요!</p>
            </div>
          </St.CalendarIntroduce>
          <St.CalendarSpring1 src={calendarSpring} />
          <St.CalendarSpring2 src={calendarSpring} />
          <St.CalendarSpring3 src={calendarSpring} />
          <St.CalendarSpring4 src={calendarSpring} />
          <St.CalendarTitle>Calendar</St.CalendarTitle>
        </St.CalendarContainer>
        <Calendar
          onChange={onChangeToday}
          value={today}
          // eng 버전
          locale="en"
          // 일요일부터 시작
          calendarType="gregory"
          tileContent={({ date, view }) => {
            const formattedDate = moment(date).format('YYYY. MM. DD.');

            if (createdAtList.find((x) => x === moment(date).format('YYYY. MM. DD.'))) {
              // postCount가 0으로만 나온다.
              // dayCount[formattedDate]가 값이 없으니까 => 0으로 된다?
              // dayCount에 문제가 있는지?
              // formattedDate에 문제가 있는지?
              // console.log({
              //   formattedDate,
              //   finded: createdAtList.find((x) => x === moment(date).format('YYYY. MM. DD.')),
              //   일치하는지: formattedDate === createdAtList.find((x) => x === moment(date).format('YYYY. MM. DD.'))
              // });
              const postCount = dayCount[formattedDate] || 0;
              return (
                <>
                  <div className="habitDayContainer" key={formattedDate}></div>
                  <St.CalendarContentsContainer>
                    <div />
                    <img
                      key={formattedDate}
                      className="habitImage"
                      src={mangofavicon}
                      alt={`habit-sticker-${formattedDate}`}
                    />
                    <St.PostCount> x{postCount}</St.PostCount>
                  </St.CalendarContentsContainer>
                </>
              );
            }
            return null;
          }}
        />
        <St.CurrentDate>현재 날짜 {moment(date).format('YYYY년 MM월 DD일')}</St.CurrentDate>
      </St.StyleCalendar>
    </St.CalendarWrapper>
  );
};

export default HabitCalendar;
