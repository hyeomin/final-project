import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const Wrapper = styled.div`
  /* width: 1000px;
  height: 100%; */
  width: 100%;
  max-width: 1000px;
  // min-width: 600px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
`;

const MySectionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  margin-bottom: 300px;

  @media screen and (max-width: 620px) {
    width: 100%;
  }
`;
const ProfileEditWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
  width: 100%;
  height: 200px;
  padding: 40px 60px;
  border-radius: 10px;
  border: 1px solid lightgray;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    margin: 10px 0 30px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    height: unset;
  }
`;

const ProfileImageContainer = styled.div`
  display: flex;
  position: relative;
`;

const PenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 0.5px solid ${theme.color.lightgray};
  background-color: white;
  font-size: larger;
  cursor: pointer;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
  align-items: baseline;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ProfileModifyBtn = styled.div`
  width: 90px;
  height: 30px;
  background-color: ${theme.color.mangoMain};
  color: white;
  font-size: 14px;
  border-radius: 30px;
  padding: 8px;
  margin-top: 7px;

  @media screen and (max-width: 768px) {
    margin-top: 4px;
    width: 80px;
    height: 20px;
    font-size: 12px;
    padding: 5px;
  }
`;

const UserPostInfoContainer = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 15px;

  @media screen and (max-width: 768px) {
    margin: 20px 0 5px;
    column-gap: 5px;
  }
`;

const PostInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 140px;
  min-width: 100px;
  height: 100px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fbfbfb;

  & img {
    width: 20px;
    height: 20px;
    /* padding-bottom: 0px; */
    margin: 5px;
  }

  & span {
    font-size: 15px;
    padding-bottom: 30px;
  }
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
  object-fit: cover;
  img {
    border-radius: 50%;
    max-width: 150px;
    max-height: 150px;
    /* width: 100%; /* 이미지가 부모 요소에 가득 차도록 설정 */
    /* height: auto; 가로로 조절되면서 세로 비율 유지 */
  }
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const ModifyButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  color: white;
  margin-top: 15px;
  margin-left: 5px;
  background-color: ${theme.color.mangoMain};
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const UserInfoModify = styled.div`
  display: flex;
  justify-content: left;
  margin-right: 50px;
  max-width: 200px;

  /* @media screen and (max-width: 768px) {
    margin: 30px 
  } */
`;
const FileInput = styled.input`
  display: none;
`;

const DisplayNameModify = styled.input`
  border-radius: 30px;
  height: 25px;
  border: 1px solid lightgray;
  padding-left: 10px;
  font-size: 13px;
  width: 150px;
  font-size: 12px;
`;

const DisplayNameCheckBtn = styled.button`
  border-radius: 20px;
  margin-left: 10px;
  font-size: 10px;
  border: 1px solid ${theme.color.lightgray};
  color: ${theme.color.mangoMain};
  &:hover {
    cursor: pointer;
  }
`;

const MyImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const MyNickname = styled.h1`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
`;

const MyEmail = styled.h4`
  font-size: 15px;
  color: ${theme.color.mangoNavy};
`;

const GuideGradeWrapper = styled.div`
  position: relative;
`;

const GuideGrade = styled.div`
  display: flex;
  align-items: center;
  /* column-gap: px; */
  width: 180px;
  height: 50px;
  padding: 12px;
  font-size: 12px;
  background-color: ${theme.color.mangoLight};
  position: absolute;
  left: 60%;
  bottom: -10px;
  border-radius: 10px;

  &:after {
    content: '';
    position: absolute;
    left: -10%;
    top: 35%;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid ${theme.color.mangoLight};
    border-bottom: 10px solid transparent;
  }
`;

const Tabs = styled.div`
  width: 100%;
  margin: 20px;
  padding: 20px;
  height: 450px;
`;

const TabButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  column-gap: 5px;
  margin-top: 80px;
  padding: 0 20px;
  font-size: 20px;
  @media screen and (max-width: 620px) {
    margin: 30px 0 0 0;
    min-width: 100%;
    max-width: 100%;
  }
`;

interface TabButtonProps {
  $isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$isActive ? 'white' : '#f6f6f6')};
  color: ${(props) => (props.$isActive ? `${theme.color.mangoMain}` : 'black')};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.$isActive ? `${theme.color.lightgray}` : 'transparent')};
  border-bottom: 1px solid transparent;
  border-radius: 10px 10px 0px 0px;

  width: 120px;
  height: 40px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    color: ${theme.color.mangoMain};
  }

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 6px;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  margin-left: 10px;
`;
export default {
  ProfileEditWrapper,

  MyNickname,
  MyEmail,
  Wrapper,
  UserInfo,
  Tabs,
  MySectionWrapper,
  TabButtonContainer,
  profileImg,
  FileInput,
  DisplayNameModify,
  UserInfoModify,
  ProfileInfo,
  UserPostInfoContainer,
  PostInfoBox,
  ProfileModifyBtn,
  TabButton,
  ModifyButton,
  PenWrapper,
  ProfileImageContainer,
  MyImage,
  GuideGrade,
  GuideGradeWrapper,
  ErrorMsg,
  DisplayNameCheckBtn
};
