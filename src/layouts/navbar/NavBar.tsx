import { useQueryClient } from '@tanstack/react-query';
import { getAdminPostList } from 'api/pageListApi';
import logo from 'assets/icons/mango-logo.png';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import useOutsideClick from 'hooks/useOutsideClick';
import AuthToggle from 'pages/auth/components/AuthToggle';
import { QUERY_KEYS } from 'query/keys';
import { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isAuthState } from 'recoil/modals';
import { pathHistoryState } from 'recoil/posts';
import { auth } from 'shared/firebase';
import AuthNavBar from './AuthNavBar';
import GuideModal from './guideModal/GuideModal';
import LoginModal from './loginModal/LoginModal';
import St, { LogoContainer } from './style';

function NavBar() {
  const [isAuthToggleOpen, setIsAuthToggleOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentUser = auth.currentUser;

  // 뒤로가기 버튼 핸들링을 위한 history 관리
  const setPathHistory = useSetRecoilState(pathHistoryState);
  const location = useLocation();

  useEffect(() => {
    setPathHistory((prev) => [...prev, location.pathname]);
  }, [location]);

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
  //prefetch는 error 반환 x
  const queryClient = useQueryClient();
  const handleHover = async () => {
    queryClient.prefetchInfiniteQuery({
      queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.ADMIN],
      queryFn: getAdminPostList,
      initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
      staleTime: 60_000
    });
  };

  //반응형 웹 (로그인/회원가입시 : navbar 히든 / 나머지는 : 보여지기)
  const [authCheck, setAuthCheck] = useRecoilState(isAuthState);
  const detailURL = window.location.href;
  const CheckAuthInURL = detailURL.includes('auth');

  useEffect(() => {
    if (CheckAuthInURL) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
    }
  }, [CheckAuthInURL]);

  // Guide modal handler
  const onToggleModal = () => {
    setIsGuideModalOpen(!isGuideModalOpen);
  };

  // Login
  // Guide modal handler
  const onLoginToggleModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <St.NavContainer ref={navRef} $isAuth={authCheck}>
      <St.NavBarContainer>
        <St.LeftNav>
          <LogoContainer onClick={() => navigate('/')}>
            <img src={logo} alt="logo" />
            <span>Mango</span>
          </LogoContainer>
          <NavLink to="/about" style={styledNav}>
            ABOUT
          </NavLink>
          <NavLink to="/bymango" style={styledNav} onMouseEnter={handleHover}>
            BY MANGO
          </NavLink>
          <NavLink to="/community" style={styledNav} onMouseEnter={handleHover}>
            COMMUNITY
          </NavLink>
          <St.GuideToggle onClick={onToggleModal}>GUIDE</St.GuideToggle>
          {isGuideModalOpen && <GuideModal onClose={onToggleModal} />}
        </St.LeftNav>

        <St.RightNav>
          <AuthNavBar styledNav={styledNav} setIsAuthToggleOpen={setIsAuthToggleOpen} />
          <St.LoginModal>
            {!currentUser ? (
              <label onClick={onLoginToggleModal}>
                <FaBars />
              </label>
            ) : null}

            {isLoginModalOpen && <LoginModal onClose={onLoginToggleModal} />}
          </St.LoginModal>
        </St.RightNav>
      </St.NavBarContainer>
      {isAuthToggleOpen && <AuthToggle setIsAuthToggleOpen={setIsAuthToggleOpen} />}
    </St.NavContainer>
  );
}

export default NavBar;
