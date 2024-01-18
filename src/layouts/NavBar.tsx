import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/icons/mango-logo.png';
import AuthToggle from '../components/auth/AuthToggle';
import useOutsideClick from '../hooks/useOutsideClick';
import { auth } from '../shared/firebase';
import theme from '../styles/theme';
import AuthNavBar from './AuthNavBar';

function NavBar() {
  const [isAuthToggleOpen, setIsAuthToggleOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  console.log('auth-->', auth);

  // AuthToggle 밖 누르면 꺼지게
  useOutsideClick<HTMLDivElement>(navRef, () => {
    if (isAuthToggleOpen) {
      setIsAuthToggleOpen(false);
    }
  });

  // 선택되면 노란색으로 NavBar 이름 스타일 바뀌게
  const styledNav = ({ isActive }: { isActive: boolean }) => {
    return { color: isActive ? '#FFA114' : '' };
  };

  return (
    <NavContainer ref={navRef}>
      <NavBarContainer>
        <LeftNav>
          <LogoContainer>
            <img src={logo} alt="logo" />
            <Logo onClick={() => navigate('/')}>Mango</Logo>
          </LogoContainer>
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

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
  font-size: 16px;
  font-weight: bold;
  color: ${theme.color.gray};
`;

const LogoContainer = styled.div`
  display: flex;

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
    cursor: pointer;
  }
`;

const Logo = styled.span``;
