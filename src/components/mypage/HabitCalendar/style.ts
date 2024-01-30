import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyleCalendar = styled.div`
  .react-calendar {
    width: 800px;
    border-radius: 0px 0px 20px 20px;

    border: none;
    box-shadow: 0px 0px 4px 0px ${theme.color.containerBorder};
  }

  .react-calendar__tile--active {
    background-color: ${theme.color.mangoLight};
  }

  .react-calendar__navigation button {
    display: flex;
    justify-content: center;
    align-content: center;
    padding-bottom: 30px;
  }

  .react-calendar__tile--active {
    color: black;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${theme.color.mangoLight};
  }

  .react-calendar button {
    width: 110px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .habitImage {
    margin-top: 5px;
    width: 50px;
    height: 60px;
  }
  .react-calendar__navigation__label {
    width: 50px;
  }
  .react-calendar__navigation__label__labelText {
    font-size: 17px;
    font-weight: 400;
  }
  .react-calendar__navigation__arrow {
    font-size: 24px;
    font-weight: 400;
    color: ${theme.color.gray};
  }
  .react-calendar__month-view__weekdays__weekday {
    height: 70px;
    font-weight: 500;
    margin-top: 30px;
  }
  .react-calendar__button:enabled:hover {
    /* cursor: pointer; */
  }

  .react-calendar button:enabled:hover {
    cursor: default;
  }
`;

const CalendarContainer = styled.div`
  position: relative;
`;

const CalendarIntroduce = styled.div`
  & span {
    color: ${theme.color.mangoMain};
    font-size: 20px;
    font-weight: 600;
    padding-left: 5px;
  }
  & img {
    width: 20x;
    height: 25px;
  }

  & div {
    margin-top: 20px;
  }

  & p {
    font-size: 15px;
    line-height: 0.5rem;
    color: ${theme.color.gray};
  }
`;

const CalendarSpring1 = styled.img`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  left: 100px;
`;
const CalendarSpring2 = styled.img`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  left: 200px;
`;

const CalendarSpring3 = styled.img`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  right: 200px;
`;

const CalendarSpring4 = styled.img`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  right: 100px;
`;

const CalendarTitle = styled.div`
  width: 800px;
  height: 100px;
  margin-top: 80px;
  border: none;
  background-color: #ffd864;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px 4px 8px 0px ${theme.color.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.mangoMain};
  font-size: 25px;
  font-family: ${theme.font.agroRegular};
  position: relative;
  z-index: 1;
`;

const CalendarContentsContainer = styled.div`
  position: relative;

  & img {
    position: absolute;
    z-index: 2;
    top: 5px;
    right: -20px;
  }
`;

const PostCount = styled.div`
  background-color: ${theme.color.mangoLight};
  border-radius: 50%;
  font-size: 15px;
  width: 22px;
  height: 22px;
  color: ${theme.color.mangoMain};

  position: absolute;
  z-index: 3;
  top: 45px;
  left: 12px;
`;

const CurrentDate = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

export default {
  CalendarContainer,
  CalendarSpring1,
  CalendarSpring2,
  CalendarSpring3,
  CalendarSpring4,
  CalendarContentsContainer,
  CalendarTitle,
  CalendarWrapper,
  StyleCalendar,
  PostCount,
  CurrentDate,
  CalendarIntroduce
};
