import styled from "styled-components";
import defaultImg from "../../assets/defaultImg.jpg";

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

const MySectionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: 600px;
  margin: 20px 20px 20px;
  padding: 20px;
  background-color: white;
`;

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
};
