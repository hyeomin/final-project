import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/mango-logo.png';
import AuthToggle from '../../components/auth/AuthToggle';
import useOutsideClick from '../../hooks/useOutsideClick';
import usePreviousPathname from '../../util/usePreviousPathname';
import AuthNavBar from './AuthNavBar';
import St, { LogoContainer } from './style';
import { useQueryClient } from '@tanstack/react-query';
import { getAdminPostList } from '../../api/pageListApi';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { QUERY_KEYS } from '../../query/keys';
import { FaSearch } from 'react-icons/fa';
import SearchNavBar from './SearchNavBar';

function NavBar() {
  const [isAuthToggleOpen, setIsAuthToggleOpen] = useState(false);
  const [isSearchToggleOpen, setIsSearchToggleOpen] = useState(false);
  console.log('isSearchToggleOpen', isSearchToggleOpen);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const prevPathName = usePreviousPathname();

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

  // hover 시 prefetch 함수
  const queryClient = useQueryClient();
  const handleHover = async () => {
    queryClient.prefetchInfiniteQuery({
      queryKey: [QUERY_KEYS.ADMIN],
      queryFn: getAdminPostList,
      initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
      staleTime: 60000
    });
  };

  // useEffect(() => {
  //   if (prevPathName === '/write') {
  //     window.location.reload();
  //   }
  // }, [prevPathName]);

  const SearchToggle = () => {
    setIsSearchToggleOpen((prev) => !prev);
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
            망고 소개
          </NavLink>

          <NavLink to="/viewAll" style={styledNav} onMouseEnter={handleHover}>
            게시물 보기
          </NavLink>
        </St.LeftNav>
        <div onClick={() => SearchToggle()}>
          <FaSearch />
          {isSearchToggleOpen && <SearchNavBar isSearchToggleOpen={isSearchToggleOpen} />}
        </div>
        <AuthNavBar styledNav={styledNav} setIsAuthToggleOpen={setIsAuthToggleOpen} />
      </St.NavBarContainer>
      {isAuthToggleOpen && <AuthToggle setIsAuthToggleOpen={setIsAuthToggleOpen} />}
    </St.NavContainer>
  );
}

export default NavBar;
