import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '../../styles/theme';

const Wrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100%;
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

const profileImg = styled.div`
  /* width: 150px;
  height: 150px; */
  /* border-radius: 50%; */
  object-fit: cover;
  img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }
`;

const ModifyBox = styled.div``;

const ModifyButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
`;

const UserInfoModify = styled.div``;
const FileInput = styled.input`
  border: 1px solid black;
`;

const FileImgUpload = styled.button``;

const DisplayNameModify = styled.input``;

const MyImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;
const MyNickname = styled.h1`
  font-size: 20px;
`;

const MyEmail = styled.h4``;

const EmailAndName = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditBtn = styled.button``;

const Tabs = styled.div`
  width: 100%;
  height: 100%;
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
    border-radius: 0px 0px 30px 30px;
    background-color: ${theme.color.lightgray};
    border: ${theme.color.lightgray};
    box-shadow: 3px 3px 3px 3px ${theme.color.gray};
  }

  .react-calendar__tile--active {
    background-color: ${theme.color.mangoYellow};
  }

  .react-calendar__navigation button {
    display: flex;
    justify-content: center;
    align-content: center;

    padding-bottom: 30px;
  }

  .react-calendar button {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border-radius: 20px; */
  }
  .habitImage {
    margin-top: 5px;
    width: 50px;
    height: 50px;
  }
`;

const CalendarTitle = styled.div`
  width: 800px;
  height: 70px;
  border: 0.5px solid lightgray;
  background-color: ${theme.color.mangoYellow};
  border-radius: 30px 30px 0px 0px;
  box-shadow: 3px 3px 3px 3px ${theme.color.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.mangoMain};
  font-size: 25px;
  font-family: ${theme.font.mango};
`;
//--------------------------------------------
// MyPosts

const MySectionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 600px;
  border-top: 1px solid #d9d9d9;
  margin-bottom: 100px;
`;

const PostsWrapper = styled.div`
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const PostTitle = styled.div`
  margin-bottom: 20px;
`;

const Contents = styled.p`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const PostsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 20px;
`;

const PostImg = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border: 0.5px solid ${theme.color.gray};
  border-radius: 30px;
  margin-bottom: 20px;
`;

const TextBox = styled.div`
  width: 290px;
  height: 300px;
`;
//--------------------------------------------
// LikesPosts

// const LikesWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   justify-content: center;
//   align-items: center;
//   gap: 20px;
// `;

// const MyLikes = styled.div`
//   display: grid;

//   flex-direction: column;
//   justify-content: center;
// `;

// const LikesPostImg = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid white;
//   width: 220px;
//   height: 170px;
//   /* margin-top: 20px; */
// `;

// const LikesPostText = styled.p``;
export default {
  ProfileEditWrapper,
  MySectionWrapper,
  MyImage,
  EmailAndName,
  MyNickname,
  MyEmail,
  Wrapper,
  UserInfo,
  EditBtn,
  Tabs,
  CalendarTitle,
  TabButtonContainer,
  CalendarBtn,
  MyPostsBtn,
  MyLikesBtn,
  CalendarWrapper,
  StyleCalendar,
  PostsWrapper,
  PostTitle,
  Contents,
  PostsBox,
  // LikesWrapper,
  // MyLikes,
  // LikesPostImg,
  // LikesPostText,
  profileImg,
  FileInput,
  FileImgUpload,
  DisplayNameModify,
  UserInfoModify,
  ProfileInfo,
  UserPostInfo,
  TabButton,
  TextBox,
  PostImg,
  ModifyButton,
  ModifyBox
};
