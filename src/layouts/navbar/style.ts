import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';

// NavBar.tsx
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  /* position: relative; */
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media screen and (max-width: 375px) {
    display: none;
  }

  @media screen (min-width: 375px) and (max-width: 375px) {
    margin: 100px auto 0 auto;
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
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
  font-size: 16px;
  font-weight: bold;
  color: ${theme.color.gray};
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

// AuthNavBar.tsx

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  color: #888;
  font-size: 14px;
`;

const StyledNavLnk = styled(NavLink)`
  font-weight: normal;
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
`;

export default { AuthContainer, StyledNavLnk, UserInfo, NavContainer, NavBarContainer, LeftNav };
