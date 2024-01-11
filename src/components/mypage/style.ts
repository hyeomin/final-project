import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '../../styles/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  row-gap: 80px;
`;

const ProfileEditWrapper = styled.div`
  display: flex;
  column-gap: 30px;

  width: 100%;
  height: 250px;
  padding: 40px;

  background-color: ${theme.color.lightgray};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
`;

const UserPostInfo = styled.div`
  display: flex;
  column-gap: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  gap: 20px;
`;

const profileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfoModify = styled.div``;
const FileInput = styled.input`
  border: 1px solid black;
`;

const FileImgUpload = styled.button``;

const DisplayNameModify = styled.input``;

const MyImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
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
  /* background-color: lightgray; */
`;

const TabButtonContainer = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 20px;
`;

const TabButton = styled.button`
  background-color: transparent;
  border-color: transparent;

  & div {
    display: flex;
    color: lightgray;
    column-gap: 7px;

    &:hover {
      color: black;
    }
  }
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
  flex-direction: column;
  width: 80%;
  height: 600px;
  /* margin: 20px 20px 20px; */
  /* padding: 20px; */

  border-top: 1px solid #d9d9d9;
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
  TabButtonContainer,
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
  LikesPostText,
  profileImg,
  FileInput,
  FileImgUpload,
  DisplayNameModify,
  UserInfoModify,
  ProfileInfo,
  UserPostInfo,
  TabButton
};
