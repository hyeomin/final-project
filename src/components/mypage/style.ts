// import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { GoHeart, GoHeartFill } from 'react-icons/go';

// const Wrapper = styled.div`
//   max-width: 1440px;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const ProfileEditWrapper = styled.div`
//   display: flex;
//   align-items: center; // ashley 추가 24.01.16
//   column-gap: 30px;
//   width: 100%;
//   height: 230px;
//   padding: 40px 60px;
//   border-radius: 10px;
//   border: 1px solid lightgray;
//   margin-top: 30px;
// `;

// const ProfileImageContainer = styled.div`
//   display: flex;
//   position: relative;
// `;

// const PenWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   width: 30px;
//   height: 30px;
//   right: 5px;
//   bottom: 5px;
//   border-radius: 50%;
//   border: 0.5px solid ${theme.color.lightgray};
//   background-color: white;
//   font-size: larger;
//   cursor: pointer;
// `;

// const ProfileInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 15px;
//   gap: 10px;
//   align-items: baseline;
// `;

// const UserPostInfoContainer = styled.div`
//   display: flex;
//   column-gap: 20px;
//   font-size: 15px;
// `;

// const PostInfoBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: left;
//   width: 140px;
//   height: 100px;
//   padding: 20px;
//   border-radius: 20px;
//   background-color: #fbfbfb;
// `;

// const UserInfo = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   margin-top: 20px;
//   gap: 20px;
// `;

// const profileImg = styled.div`
//   /* width: 150px;
//   height: 150px; */
//   /* border-radius: 50%; */
//   object-fit: cover;
//   img {
//     border-radius: 50%;
//     width: 150px;
//     height: 150px;
//   }
// `;

// const ModifyButton = styled.button`
//   width: 80px;
//   height: 30px;
//   border-radius: 30px;
//   border: none;
//   font-size: 12px;
//   color: white;
//   margin-top: 15px;
//   margin-left: 5px;
//   background-color: ${theme.color.mangoMain};
//   font-weight: 600;
// `;

// const UserInfoModify = styled.div`
//   /* background-color: red; */
//   /* width: 180px; */
//   display: flex;
//   justify-content: left;
//   margin-right: 50px;
//   width: 170px;
//   /* height: 200px; */
// `;
// const FileInput = styled.input`
//   display: none;
//   /* border: 1px solid black; */
// `;

// const DisplayNameModify = styled.input`
//   border-radius: 30px;
//   height: 25px;
//   border: 1px solid lightgray;
//   padding-left: 10px;
//   font-size: 13px;
//   width: 150px;
//   font-size: 12px;
// `;

// const MyImage = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
// `;

// const MyNickname = styled.h1`
//   font-size: 20px;
//   font-weight: 600;
// `;

// const MyEmail = styled.h4`
//   font-size: 15px;
//   color: ${theme.color.mangoNavy};
// `;

// const EmailAndName = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const GuideGradeWrapper = styled.div`
//   position: relative;
// `;

// const GuideGrade = styled.div`
//   width: 140px;
//   height: 60px;
//   padding: 15px;
//   font-size: 12px;
//   background-color: ${theme.color.mangoLight};
//   position: absolute;
//   left: 60%;
//   bottom: -20px;
//   border-radius: 10px;

//   &:after {
//     content: '';
//     position: absolute;
//     left: -12%;
//     top: 35%;
//     /* transform: translateY(-50%); */
//     border-top: 10px solid transparent;
//     border-left: 10px solid transparent;
//     border-right: 10px solid ${theme.color.mangoLight};
//     border-bottom: 10px solid transparent;
//   }
// `;

// const Tabs = styled.div`
//   width: 100%;
//   height: 100%;
//   margin: 20px;
//   padding: 20px;
// `;

// const TabButtonContainer = styled.div`
//   display: flex;
//   justify-content: left;
//   width: 100%;
//   column-gap: 5px;

//   margin-top: 80px;
//   /* column-gap: 20px; */
//   font-size: 20px;
// `;

// const TabButton = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #f6f6f6;
//   &:hover {
//     cursor: pointer;
//     background-color: white;
//     border: 2.5px solid #f6f6f6;
//     color: #ffa114;
//   }
//   border-radius: 10px 10px 0px 0px;
//   color: black;
//   border-color: transparent;

//   width: 120px;
//   height: 40px;
//   font-size: 14px;
//   /* gap: 7px; */
//   /* & div {
//     display: flex;
//     color: black;
//     column-gap: 7px; */
//   &:hover {
//     cursor: pointer;
//     color: #ffa114;
//     /* } */
//   }
// `;

// //--------------------------------------------
// // Calendar

// const CalendarWrapper = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const StyleCalendar = styled.div`
//   .react-calendar {
//     width: 800px;
//     border-radius: 0px 0px 20px 20px;

//     /* background-color: #fffaeb; */
//     border: none;
//     box-shadow: 0px 0px 4px 0px ${theme.color.containerBorder};
//   }

//   .react-calendar__tile--active {
//     background-color: ${theme.color.mangoLight};
//   }

//   .react-calendar__navigation button {
//     display: flex;
//     justify-content: center;
//     align-content: center;
//     padding-bottom: 30px;
//   }

//   .react-calendar button {
//     width: 110px;
//     height: 110px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }
//   .habitImage {
//     margin-top: 5px;
//     width: 50px;
//     height: 50px;
//   }
//   .react-calendar__navigation__label {
//     /* background-color: red; */
//     width: 50px;
//   }
//   .react-calendar__navigation__label__labelText {
//     font-size: 17px;
//     font-weight: 400;
//     /* color: ${theme.color.gray}; */
//   }
//   .react-calendar__navigation__arrow {
//     font-size: 24px;
//     font-weight: 400;
//     color: ${theme.color.gray};
//   }
//   .react-calendar__month-view__weekdays__weekday {
//     height: 70px;
//     font-weight: 500;
//     margin-top: 30px;
//     /* text-decoration: none; */
//   }
// `;

// const CalendarContainer = styled.div`
//   position: relative;
// `;

// const CalendarSpring1 = styled.img`
//   position: absolute;
//   z-index: 2;
//   bottom: 60px;
//   left: 100px;
// `;
// const CalendarSpring2 = styled.img`
//   position: absolute;
//   z-index: 2;
//   bottom: 60px;
//   left: 200px;
// `;

// const CalendarSpring3 = styled.img`
//   position: absolute;
//   z-index: 2;
//   bottom: 60px;
//   right: 200px;
// `;

// const CalendarSpring4 = styled.img`
//   position: absolute;
//   z-index: 2;
//   bottom: 60px;
//   right: 100px;
// `;

// const CalendarTitle = styled.div`
//   width: 800px;
//   height: 100px;
//   /* border: 0.5px solid lightgray; */
//   margin-top: 60px;
//   border: none;
//   background-color: #ffd864;
//   border-radius: 20px 20px 0px 0px;
//   box-shadow: 0px 4px 8px 0px ${theme.color.gray};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${theme.color.mangoMain};
//   font-size: 25px;
//   font-family: ${theme.font.agroRegular};
//   position: relative;
//   z-index: 1;
// `;

// const CalendarContentsContainer = styled.div`
//   position: relative;
// `;

// const PostCount = styled.div`
//   background-color: #ffcb30;
//   border-radius: 50%;
//   font-size: 13px;
//   width: 20px;
//   height: 20px;
//   color: white;

//   position: absolute;
//   z-index: 3;
//   bottom: 5px;
//   left: 42px;
// `;

// const CurrentDate = styled.div`
//   margin-top: 30px;
// `;

// //--------------------------------------------
// // MyPosts

// const MySectionWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   width: 100%;
//   /* height: 600px; */
//   border: 1px solid #d9d9d9;
//   margin-bottom: 300px;
// `;

// const PostsWrapper = styled.div`
//   /* justify-content: center;
//   align-items: center; */
//   gap: 20px;
// `;

// const PostTitle = styled.div`
//   margin-bottom: 20px;
// `;

// const Contents = styled.p`
//   display: flex;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
// const PostsBox = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   place-items: center;
//   gap: 20px;
// `;

// const PostImg = styled.img`
//   width: 300px;
//   height: 200px;
//   object-fit: cover;
//   border: 0.5px solid ${theme.color.gray};
//   border-radius: 30px;
//   margin-bottom: 20px;
// `;

// const TextBox = styled.div`
//   width: 290px;
//   height: 300px;
// `;

// const ErrorMsg = styled.div`
//   color: red;
// `;
// export default {
//   ProfileEditWrapper,
//   MySectionWrapper,
//   // MyImage,
//   EmailAndName,
//   MyNickname,
//   MyEmail,
//   Wrapper,
//   UserInfo,
//   Tabs,
//   CalendarContainer,
//   CalendarSpring1,
//   CalendarSpring2,
//   CalendarSpring3,
//   CalendarSpring4,
//   CalendarContentsContainer,
//   CalendarTitle,
//   TabButtonContainer,
//   CalendarWrapper,
//   StyleCalendar,
//   PostsWrapper,
//   PostTitle,
//   Contents,
//   PostsBox,
//   profileImg,
//   FileInput,
//   DisplayNameModify,
//   UserInfoModify,
//   ProfileInfo,
//   UserPostInfoContainer,
//   PostInfoBox,
//   TabButton,
//   TextBox,
//   PostImg,
//   ModifyButton,
//   CurrentDate,
//   PostCount,
//   PenWrapper,
//   ProfileImageContainer,
//   MyImage,
//   GuideGrade,
//   GuideGradeWrapper,
//   ErrorMsg
// };
