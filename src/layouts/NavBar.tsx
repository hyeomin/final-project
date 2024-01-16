import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AuthToggle from '../components/auth/AuthToggle';
import useOutsideClick from '../hooks/useOutsideClick';
import theme from '../styles/theme';
import AuthNavBar from './AuthNavBar';

function NavBar() {
  const styledNav = ({ isActive }: { isActive: boolean }) => {
    return { color: isActive ? '#FFA114`' : '' };
  };

  const [isAuthToggleOpen, setIsAuthToggleOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // AuthToggle 밖 누르면 꺼지게 하기
  useOutsideClick<HTMLDivElement>(navRef, () => {
    if (isAuthToggleOpen) {
      setIsAuthToggleOpen(false);
    }
  });

  return (
    <NavContainer ref={navRef}>
      <NavBarContainer>
        <LeftNav>
          <Logo>Mango</Logo>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/about" style={styledNav}>
            망고 소개
          </NavLink>
          <NavLink to="/viewAll" style={styledNav}>
            게시물 보기
          </NavLink>
        </LeftNav>
        <AuthNavBar styledNav={styledNav} setIsAuthToggleOpen={setIsAuthToggleOpen} />
      </NavBarContainer>
      {isAuthToggleOpen && <AuthToggle setIsAuthToggleOpen={setIsAuthToggleOpen} />}
    </NavContainer>
  );
}

export default NavBar;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  height: 60px;
  border-bottom: 1px solid lightgrey;

  & a {
    text-decoration: none;
  }
`;

const Logo = styled.span`
  font-family: ${theme.font.mango};
  color: ${theme.color.mangoMain};
  font-size: 30px;
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
  color: #888888;
  font-size: 16px;
  font-weight: bold;
`;
