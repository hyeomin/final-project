import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 431px) {
    display: flex;
    justify-content: center;
    margin: 30px 0;
    width: 100%;
  }
`;

const StyleCalendar = styled.div`
  @media screen and (max-width: 431px) {
    width: 100%;
  }
  .react-calendar {
    width: 800px;
    border-radius: 0px 0px 20px 20px;
    height: auto;
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

    @media screen and (max-width: 431px) {
      width: 60px;
      height: 60px;
      padding: 5px;
      font-size: 10px;
    }
  }
  .habitImage {
    margin-top: 5px;
    width: 50px;
    height: 60px;
    @media screen and (max-width: 431px) {
      margin-top: 5px;
      width: 25px;
      height: 30px;
    }
  }
  .react-calendar__navigation__label {
    width: 50px;
  }
  .react-calendar__navigation__label__labelText {
    font-size: 17px;
    font-weight: 400;
    @media screen and (max-width: 431px) {
      font-size: 12px;
    }
  }
  .react-calendar__navigation__arrow {
    font-size: 24px;
    font-weight: 400;
    color: ${theme.color.gray};
  }
  .react-calendar__month-view__weekdays__weekday {
    height: 70px;
    font-weight: 500;
    @media screen and (max-width: 431px) {
      font-size: 0.6rem;
      height: 60px;
    }
  }

  .react-calendar button:enabled:hover {
    cursor: default;
  }
  .react-calendar__month-view__weekdays {
    @media screen and (max-width: 431px) {
      font-size: 0.6rem;
    }
  }
`;

const CalendarContainer = styled.div`
  position: relative;
`;

const CalendarIntroduce = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 431px) {
    font-size: 14px;
  }
  & span {
    color: ${theme.color.mangoMain};
    font-size: 20px;
    font-weight: 600;
    padding-left: 5px;

    @media screen and (max-width: 431px) {
      font-size: 14px;
    }
  }
  & img {
    width: 20px;
    height: 25px;
    @media screen and (max-width: 431px) {
      width: 15px;
      height: 20px;
    }
  }

  & p {
    font-size: 15px;
    line-height: 0.5rem;
    color: ${theme.color.gray};
    @media screen and (max-width: 431px) {
      font-size: 10px;
    }
  }

  @media screen and (max-width: 431px) {
    font-size: 0.8rem;
  }
`;

const CalendarSpring1 = styled.img`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  left: 100px;
  @media screen and (max-width: 431px) {
    width: 15px;
    height: 40px;
    bottom: 50px;
    left: 50px;
  }
`;
const CalendarSpring2 = styled.img`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  left: 200px;
  @media screen and (max-width: 431px) {
    width: 15px;
    height: 40px;
    bottom: 50px;
    left: 100px;
  }
`;

const CalendarSpring3 = styled.img`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  right: 200px;
  @media screen and (max-width: 431px) {
    width: 15px;
    height: 40px;
    bottom: 50px;
    right: 50px;
  }
`;

const CalendarSpring4 = styled.img`
  position: absolute;
  z-index: 2;
  bottom: 60px;
  right: 100px;
  @media screen and (max-width: 431px) {
    width: 15px;
    height: 40px;
    bottom: 50px;
    right: 100px;
  }
`;

const CalendarTitle = styled.div`
  max-width: 800px;
  width: 100%;
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

  @media screen and (max-width: 431px) {
    font-size: 20px;
    width: 100%;
    height: 70px;
    margin-top: 40px;
  }
`;

const CalendarContentsContainer = styled.div`
  position: relative;

  & img {
    position: absolute;
    z-index: 2;
    top: 2px;
    right: -20px;
  }

  @media screen and (max-width: 431px) {
    top: -3px;
    right: 12px;
  }
`;

const PostCount = styled.div`
  background-color: ${theme.color.mangoMain};
  border-radius: 50%;
  font-size: 13px;
  width: 22px;
  height: 22px;
  color: white;
  position: absolute;
  z-index: 3;
  top: 45px;
  left: 10px;

  @media screen and (max-width: 431px) {
    width: 16px;
    height: 16px;
    font-size: 10px;
    top: 22px;
    left: 15px;
  }
`;

const CurrentDate = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 431px) {
    font-size: 12px;
  }
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
