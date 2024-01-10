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
      <LeftNav className="left-side">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">게시글 전체보기</NavLink>
        <NavLink to="/about">About</NavLink>
      </LeftNav>
      <AuthNavBar />
    </NavContainer>
  );
}

export default NavBar;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 30px;
`;

const LeftNav = styled.div`
  display: flex;
  column-gap: 10px;
`;
