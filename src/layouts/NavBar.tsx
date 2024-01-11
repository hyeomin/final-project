import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isLoggedInState } from '../recoil/users';
import AuthNavBar from './AuthNavBar';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  console.log(isLoggedIn);

  return (
    <NavContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/viewAll">게시글 전체보기</NavLink>
      <NavLink to="/about">About</NavLink>
      <AuthNavBar />
    </NavContainer>
  );
}

export default NavBar;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 240px;

  background-color: pink;
`;
