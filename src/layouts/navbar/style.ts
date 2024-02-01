import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';

type NavProps = {
  $isAuth: boolean;
};

// NavBar.tsx
const NavContainer = styled.div<NavProps>`
  display: flex;
  flex-direction: column;
  background-color: white;
  /* position: relative; */
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  //반응형 웹 (로그인/회원가입시 : navbar 히든 / 나머지는 : 보여지기) : 세로 버전
  @media screen and (max-width: 431px) {
    display: ${(props) => (props.$isAuth ? 'none' : 'flex')};
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
  }
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  height: 60px;
  border-bottom: 1px solid ${theme.color.lightgray};

  & a {
    text-decoration: none;
  }

  //모바일 (세로)
  @media screen and (max-width: 431px) {
    padding: 0;
    width: 90%;
  }
`;

const GuideToggle = styled.div`
  cursor: pointer;
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
  font-size: 16px;
  font-weight: bold;
  color: ${theme.color.gray};

  //모바일 (세로)
  @media screen and (max-width: 431px) {
    column-gap: 10px;
    font-size: 10px;
    color: ${theme.color.gray};
    & span {
      display: none;
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  cursor: pointer;

  & img {
    width: 27px;
    height: 27px;
    object-fit: contain;
    transform: rotate(340deg);
  }

  & span {
    font-family: ${theme.font.mango};
    color: ${theme.color.mangoMain};
    font-size: 30px;
  }
`;

export const LogoContainerFooter = styled.div`
  display: flex;
  cursor: pointer;

  & img {
    width: 27px;
    height: 27px;
    object-fit: contain;
    transform: rotate(340deg);
  }

  & span {
    font-family: ${theme.font.mango};
    color: ${theme.color.mangoMain};
    font-size: 30px;
  }
`;

// AuthNavBar.tsx
const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  color: #888;
  font-size: 14px;
  //모바일 : 세로
  @media screen and (max-width: 431px) {
    column-gap: 10px;
  }
`;

const StyledNavLnkWrite = styled(NavLink)`
  font-weight: normal;
`;

const StyledNavLnk = styled(NavLink)`
  font-weight: normal;

  //모바일 : 세로
  @media screen and (max-width: 431px) {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: black;
  font-weight: bold;
  cursor: pointer;

  & img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: fill;
  }

  & button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border-color: transparent;
    padding: 0;
  }

  & span {
    //모바일 : 세로
    @media screen and (max-width: 431px) {
      display: none;
    }
  }
`;

const LoginModal = styled.div`
  //모바일 세로
  @media screen and (min-width: 431px) {
    display: none;
  }
`;

export default {
  AuthContainer,
  StyledNavLnk,
  UserInfo,
  NavContainer,
  NavBarContainer,
  LeftNav,
  LogoContainerFooter,
  LoginModal,
  StyledNavLnkWrite
};
