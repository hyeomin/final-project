import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import defaultImg from '../../assets/defaultImg.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProfileEditWrapper = styled.div`
  width: 80%;
  height: 200px;
  margin: 20px;
  padding: 20px;
  background-color: white;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  gap: 100px;
`;

const MyImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  /* background-color: lightgray; */
  background-image: url(${defaultImg});
`;
const MyNickname = styled.h1`
  font-size: 20px;
`;

const EditBtn = styled.button``;

const Tabs = styled.div`
  width: 80%;
  height: 500px;
  margin: 20px;
  padding: 20px;
  background-color: lightgray;
`;

const TabBtns = styled.div`
  margin-top: 20px;
  display: flex;
  align-self: self-start;
  margin-left: 70px;
  justify-content: flex-start;
`;

const CalendarBtn = styled.button``;

const MyPostsBtn = styled.button``;

const MyLikesBtn = styled.button``;

//--------------------------------------------
// Calendar

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyleCalendar = styled.div`
  .react-calendar {
    width: 800px;
    height: 400px;
  }

  .react-calendar__tile--active {
    background-color: pink;
  }
`;
//--------------------------------------------
// MyPosts

const MySectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  height: 600px;
  margin: 20px 20px 20px;
  padding: 20px;
  background-color: white;
`;

const MyPostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const MyPosts = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
`;

const MyPostImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  width: 220px;
  height: 170px;
  margin-top: 20px;
`;
const MyPostText = styled.p``;
//--------------------------------------------
// LikesPosts

const LikesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const MyLikes = styled.div`
  display: grid;

  flex-direction: column;
  justify-content: center;
`;

const LikesPostImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  width: 220px;
  height: 170px;
  margin-top: 20px;
`;

const LikesPostText = styled.p``;
export default {
  ProfileEditWrapper,
  MySectionWrapper,
  MyImage,
  MyNickname,
  Wrapper,
  UserInfo,
  EditBtn,
  Tabs,
  TabBtns,
  CalendarBtn,
  MyPostsBtn,
  MyLikesBtn,
  CalendarWrapper,
  StyleCalendar,
  MyPostsWrapper,
  MyPostImg,
  MyPosts,
  MyPostText,
  LikesWrapper,
  MyLikes,
  LikesPostImg,
  LikesPostText
};
