import React from 'react';
import Calendar from 'react-calendar';
import St from './style';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { QUERY_KEYS } from '../../query/keys';
import { getMyPosts } from '../../api/myPostAPI';
import { useQuery } from '@tanstack/react-query';
import habitSticker from '../../assets/habitSticker.png';
import { getFormattedDateCustom } from '../../util/formattedDateAndTime';
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

  // post 작성 날짜 가져와서 state에 담기
  const [mark, setMark] = useState([]);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getMyPosts
  });
  const createdAtList = data ? data.map((data) => getFormattedDateCustom(data.createdAt!)) : [];
  const dayList: string[] = [
    //테스트용
    '2023. 12. 12.',
    '2023. 12. 25.',
    '2024. 01. 01.',
    '2024. 01. 05.',
    '2024. 01. 07.',
    '2024. 01. 07.',
    '2024. 01. 12.'
  ];
  console.log('포스트의 날짜 목록 가져오기', createdAtList);

  const getElCount = (arr: string[]): Record<string, number> =>
    arr.reduce((ac: Record<string, number>, v) => {
      ac[v] = (ac[v] || 0) + 1;
      return ac;
    }, {});
  const aa = getElCount(dayList);
  console.log('aa', aa);

  // 2023. 12. 12. :  1
  // 2023. 12. 25. :  1
  // 2024. 01. 01. :  1
  // 2024. 01. 05. :  1
  // 2024. 01. 07. :  2
  // 2024. 01. 12. :  1

  return (
    <St.CalendarWrapper>
      <St.StyleCalendar>
        <St.CalendarTitle>CALENDAR</St.CalendarTitle>
        <Calendar
          onChange={onChangeToday}
          value={today}
          // eng 버전
          locale="en"
          // 일요일부터 시작
          calendarType="gregory"
          tileContent={({ date, view }) => {
            const formattedDate = moment(date).format('YYYY. MM. DD.');

            if (dayList.find((x) => x === moment(date).format('YYYY. MM. DD.'))) {
              // postCount가 0으로만 나온다.
              // aa[formattedDate]가 값이 없으니까 => 0으로 된다?
              // aa에 문제가 있는지?
              // formattedDate에 문제가 있는지?
              console.log({
                formattedDate,
                finded: dayList.find((x) => x === moment(date).format('YYYY. MM. DD.')),
                일치하는지: formattedDate === dayList.find((x) => x === moment(date).format('YYYY. MM. DD.'))
              });
              const postCount = aa[formattedDate] || 0;
              return (
                <>
                  <div className="habitDayContainer" key={formattedDate}></div>
                  <img
                    key={formattedDate}
                    className="habitImage"
                    src={habitSticker}
                    alt={`habit-sticker-${formattedDate}`}
                  />
                  x {postCount}
                  {/* <div clasName="habitDate">{moment(date).format('DD')}</div> */}
                </>
              );
            }
            return null;
          }}
        />
        현재 날짜 {moment(date).format('YYYY년 MM월 DD일')}
      </St.StyleCalendar>
    </St.CalendarWrapper>
  );
};

export default HabitCalendar;
