import { useQueryClient } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { getAdminPostList } from '../../api/pageListApi';
import logo from '../../assets/icons/mango-logo.png';
import AuthToggle from '../../components/auth/AuthToggle';
import useOutsideClick from '../../hooks/useOutsideClick';
import { QUERY_KEYS } from '../../query/keys';
import { pathHistoryState } from '../../recoil/posts';
import AuthNavBar from './AuthNavBar';
import GuideModal from './guideModal/GuideModal';
import St, { LogoContainer } from './style';

function NavBar() {
  const [isAuthToggleOpen, setIsAuthToggleOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 뒤로가기 버튼 핸들링을 위한 history 관리
  const setPathHistory = useSetRecoilState(pathHistoryState);
  const location = useLocation();

  useEffect(() => {
    setPathHistory((prev) => [...prev, location.pathname]);
  }, [location, setPathHistory]);

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
      staleTime: 60_000
    });
  };

  //반응형 웹 (로그인/회원가입시 : navbar 히든 / 나머지는 : 보여지기)
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const detailURL = window.location.href;
    const isAuthInURL = detailURL.includes('auth');
    setIsAuth(isAuthInURL);
  }, [isAuth]);

  // Guide modal handler
  const onToggleModal = () => {
    setIsGuideModalOpen(!isGuideModalOpen);
  };

  return (
    <St.NavContainer ref={navRef} isAuth={isAuth}>
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
          <div onClick={onToggleModal}>GUIDE</div>
          {isGuideModalOpen && <GuideModal onClose={onToggleModal} />}
        </St.LeftNav>
        <AuthNavBar styledNav={styledNav} setIsAuthToggleOpen={setIsAuthToggleOpen} />
      </St.NavBarContainer>
      {isAuthToggleOpen && <AuthToggle setIsAuthToggleOpen={setIsAuthToggleOpen} />}
    </St.NavContainer>
  );
}

export default NavBar;
