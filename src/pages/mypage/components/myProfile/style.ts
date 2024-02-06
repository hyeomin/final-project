import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from 'styles/theme';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: 431px) {
    margin: 5px 5px auto 5px;
    width: 100%;
  }
`;

const MySectionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  margin-bottom: 300px;
  justify-content: center;

  @media screen and (max-width: 431px) {
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
  }
`;
const ProfileEditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 30px;
  padding: 40px 60px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid lightgray;
  margin-top: 50px;

  @media screen and (max-width: 431px) {
    display: flex;
    align-items: center;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    margin-top: 5px;
  }
`;

const ProFileEditContainer = styled.div`
  display: flex;
  gap: 20px;
  @media screen and (max-width: 431px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

const ProfileImageContainer = styled.div`
  display: flex;
  position: relative;

  @media screen and (max-width: 431px) {
    display: flex;
    align-items: center;
  }
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

  @media screen and (max-width: 431px) {
    width: 20px;
    height: 20px;
    font-size: small;
  }
`;

const ModifyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media screen and (max-width: 431px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
  align-items: baseline;
  /* margin-right: 100px; */

  @media screen and (max-width: 431px) {
    display: flex;
    flex-wrap: nowrap;
  }
`;

const ProfileModifyBtn = styled.div`
  width: 90px;
  height: 25px;
  background-color: ${theme.color.mangoMain};
  color: white;
  font-size: 12px;
  border-radius: 30px;
  padding: 7px;
  margin-top: 7px;
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 431px) {
    margin-top: 2px;
    width: 60px;
    height: 20px;
    font-size: 10px;
    padding: 5px;
  }
`;

const UserPostInfoContainer = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 15px;

  /* margin-left: 50px; */

  @media screen and (max-width: 431px) {
    display: flex;
    justify-content: center;
    margin: 20px 0 5px;
    column-gap: 5px;
  }
`;

const PostInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 140px;
  /* width: 100%; */
  /* min-width: 100px; */
  height: 100px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fbfbfb;

  @media screen and (max-width: 431px) {
    width: 20px;
    /* height: 20px; */
    height: 80px;
    width: 90px;
    padding: 20px;
    font-size: 12px;
  }

  & img {
    width: 20px;
    height: 20px;
    /* padding-bottom: 0px; */
    margin: 5px;
  }

  & span {
    font-size: 15px;
    padding-bottom: 30px;
    @media screen and (max-width: 431px) {
      font-size: 12px;
      margin-bottom: 50px;
    }
  }
`;
const LevelBox = styled.div`
  display: flex;
  width: 20px;
  margin-top: 20p;
  gap: 5px;
  @media screen and (max-width: 431px) {
    margin-top: -3px;
  }
`;

const LevelEmoji = styled.div`
  margin-top: 10px;
  @media screen and (max-width: 431px) {
    width: 10px;
    font-size: 10px;
    height: 10px;
    margin-top: 0px;
  }
`;

const Level = styled.div`
  margin-top: 10px;

  @media screen and (max-width: 431px) {
    margin-top: 0px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  margin-left: 50px;
  @media screen and (max-width: 431px) {
    margin-top: 10px;
  }
`;

const PostInfoIcon = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  @media screen and (max-width: 431px) {
    margin-top: 10px;
  }
  img {
    @media screen and (max-width: 431px) {
      width: 12px;
      height: 12px;
      margin-top: 5px;
    }
  }
`;

const RankingIcon = styled.div`
  display: flex;
  align-items: center;
  margin-top: 17px;
  @media screen and (max-width: 431px) {
    margin-top: 5px;
  }
  img {
    @media screen and (max-width: 431px) {
      width: 12px;
      height: 12px;
      margin-top: 5px;
    }
  }
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
  @media screen and (max-width: 431px) {
    width: 20px;
    height: 20px;
  }
`;

const ModifyButton = styled.button`
  width: 70px;
  height: 25px;
  border-radius: 30px;
  border: none;
  font-size: 10px;
  color: white;
  margin-top: 10px;
  background-color: ${theme.color.mangoMain};
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 431px) {
    width: 50px;
    height: 20px;
    font-weight: 500;
    font-size: 8px;
    margin-top: 0px;
  }
`;

const UserInfoModify = styled.div`
  display: flex;
  justify-content: left;
  margin-right: 100px;
  max-width: 200px;

  @media screen and (max-width: 431px) {
    justify-content: left;
  }
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

  @media screen and (max-width: 431px) {
    width: 100px;
    height: 20px;
    font-weight: 500;
    font-size: 10px;
  }
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

  @media screen and (max-width: 431px) {
    width: 70px;
    height: 20px;
    font-weight: 500;
    font-size: 9px;
  }
`;

const MyImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  @media screen and (max-width: 431px) {
    width: 60px;
    height: 60px;
  }
`;

const MyNickname = styled.h1`
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 431px) {
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
`;

const MyEmail = styled.h4`
  font-size: 15px;
  color: ${theme.color.mangoNavy};
  @media screen and (max-width: 431px) {
    font-size: 12px;
  }
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
  @media screen and (max-width: 431px) {
    padding: 7px;
    left: -45px;
    bottom: 30px;
    height: 50px;
    width: 140px;
    font-size: 10px;
    line-height: 0.7rem;
  }

  &:after {
    content: '';
    position: absolute;
    left: -10%;
    top: 35%;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid ${theme.color.mangoLight};
    border-bottom: 10px solid transparent;

    @media screen and (max-width: 431px) {
      left: 70px;
      top: 50px;
      border-top: 10px solid ${theme.color.mangoLight};
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }
`;

const RankingInfoWrapper = styled.div`
  position: relative;
`;
// const Test = styled.div`
//   width: 20px;
//   background-color: rebeccapurple;
// `;
const RankingInfo = styled.div`
  display: flex;
  align-items: center;
  /* column-gap: px; */
  width: 180px;
  height: 50px;
  padding: 12px;
  font-size: 12px;
  background-color: ${theme.color.mangoLight};
  position: absolute;
  left: 15px;
  bottom: -30px;
  border-radius: 10px;
  @media screen and (max-width: 431px) {
    padding: 15px;
    left: -85px;
    bottom: 10px;
    height: 50px;
    width: 140px;
    font-size: 10px;
    line-height: 0.7rem;
  }

  &:after {
    content: '';
    position: absolute;
    left: -10%;
    top: 35%;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid ${theme.color.mangoLight};
    border-bottom: 10px solid transparent;

    @media screen and (max-width: 431px) {
      left: 70px;
      top: 50px;
      border-top: 10px solid ${theme.color.mangoLight};
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column; //솔 test
  justify-content: center;
  width: 100%;
  margin: 20px;
  padding: 20px;

  @media screen and (max-width: 431px) {
    width: 100%;
    padding: 10px;
    margin: 0 20px;
  }
`;

const TabButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  column-gap: 5px;
  margin-top: 80px;
  /* margin-left: 150px; */
  padding: 0 20px;
  font-size: 20px;
  @media screen and (max-width: 431px) {
    margin: 30px 0 0 0;
    min-width: 100%;
    width: 100%;
    justify-content: center;
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

  @media screen and (max-width: 431px) {
    font-size: 10px;

    width: 80px;
    height: 30px;
  }

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

  & span {
    @media screen and (max-width: 431px) {
      font-size: 10px;
    }
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  margin-left: 5px;

  @media screen and (max-width: 431px) {
    font-size: 10px;
  }
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
  LevelBox,
  LevelEmoji,
  Level,
  DisplayNameModify,
  UserInfoModify,
  ProFileEditContainer,
  ProfileInfo,
  ModifyBox,
  PostInfoIcon,
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
  RankingInfoWrapper,
  RankingInfo,
  ErrorMsg,
  DisplayNameCheckBtn,
  RankingIcon
};
