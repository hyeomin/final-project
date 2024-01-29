import { useQueryClient } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAdminPostList } from '../../api/pageListApi';
import logo from '../../assets/icons/mango-logo.png';
import AuthToggle from '../../components/auth/AuthToggle';
import useOutsideClick from '../../hooks/useOutsideClick';
import { QUERY_KEYS } from '../../query/keys';
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

  // hover 시 prefetch 함수!
  const queryClient = useQueryClient();
  const handleHover = async () => {
    queryClient.prefetchInfiniteQuery({
      queryKey: [QUERY_KEYS.ADMIN],
      queryFn: getAdminPostList,
      initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
      staleTime: 60000
    });
  };

  return (
    <St.NavContainer ref={navRef}>
      <St.NavBarContainer>
        <St.LeftNav>
          <LogoContainer onClick={() => navigate('/')}>
            <img src={logo} alt="logo" />
            <span>Mango</span>
          </LogoContainer>
          <NavLink to="/about" style={styledNav}>
            ABOUT
          </NavLink>

          <NavLink to="/mangoContents" style={styledNav} onMouseEnter={handleHover}>
            BY MANGO
          </NavLink>
          <NavLink to="/viewAll" style={styledNav} onMouseEnter={handleHover}>
            COMMUNITY
          </NavLink>
        </St.LeftNav>

        <AuthNavBar styledNav={styledNav} setIsAuthToggleOpen={setIsAuthToggleOpen} />
      </St.NavBarContainer>
      {isAuthToggleOpen && <AuthToggle setIsAuthToggleOpen={setIsAuthToggleOpen} />}
    </St.NavContainer>
  );
}

export default NavBar;
