import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/mango-logo.png';
import AuthToggle from '../../components/auth/AuthToggle';
import useOutsideClick from '../../hooks/useOutsideClick';
import AuthNavBar from './AuthNavBar';
import St, { LogoContainer } from './style';

function NavBar() {
  const [isAuthToggleOpen, setIsAuthToggleOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const onUnsavedChangesHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // e.preventDefault();
    // if (window.location.pathname === '/write') {
    //   const confirm = window.confirm('이동하시겠습니까?');
    //   if (confirm) {
    //     window.location.reload();
    //     navigate('/write');
    //   } else return;
    // }
  };

  return (
    <St.NavContainer ref={navRef}>
      <St.NavBarContainer>
        <St.LeftNav>
          <LogoContainer onClick={() => navigate('/')}>
            <img src={logo} alt="logo" />
            <span>Mango</span>
          </LogoContainer>
          <NavLink to="/about" onClick={onUnsavedChangesHandler} style={styledNav}>
            망고 소개
          </NavLink>
          <NavLink to="/viewAll" style={styledNav}>
            게시물 보기
          </NavLink>
        </St.LeftNav>
        <AuthNavBar styledNav={styledNav} setIsAuthToggleOpen={setIsAuthToggleOpen} />
      </St.NavBarContainer>
      {isAuthToggleOpen && <AuthToggle setIsAuthToggleOpen={setIsAuthToggleOpen} />}
    </St.NavContainer>
  );
}

export default NavBar;
