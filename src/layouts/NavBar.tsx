import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../styles/theme';
import AuthNavBar from './AuthNavBar';

function NavBar() {
  const styledNav = ({ isActive }: { isActive: boolean }) => {
    return { color: isActive ? '#222222' : '' };
  };

  return (
    <NavContainer>
      <LeftNav>
        <Logo>Mango</Logo>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/about" style={styledNav}>
          망고소개
        </NavLink>
        <NavLink to="/viewAll" style={styledNav}>
          게시물 보기
        </NavLink>
      </LeftNav>
      <AuthNavBar styledNav={styledNav} />
    </NavContainer>
  );
}

export default NavBar;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 120px;
  border: 1px solid lightgrey;

  & a {
    text-decoration: none;
  }
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
  color: #888888;
  font-size: 16px;
  font-weight: bold;
`;

const Logo = styled.span`
  font-family: ${theme.font.mango};
  color: ${theme.color.mangoMain};
  font-size: 30px;
`;
