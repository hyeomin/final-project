import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import defaultImg from '../assets/defaultImg.jpg';
import { isSignUpState, roleState } from '../recoil/users';
import { auth } from '../shared/firebase';

type Props = {
  styledNav: ({ isActive }: { isActive: boolean }) => {
    color: string;
  };
  setIsAuthToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthNavBar({ styledNav, setIsAuthToggleOpen }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    setIsLoggedIn(!!auth.currentUser);
  }, [auth]);

  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [role, setRole] = useRecoilState(roleState);

  const navigate = useNavigate();

  const onAuthCheckHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isLoggedIn) {
      const confirmation = window.confirm('로그인이 필요합니다. 로그인 창으로 이동하시겠습니까?');
      if (confirmation) {
        navigate('/auth');
      } else {
        navigate('/');
      }
    } else navigate('/write');
  };

  const onLogOutHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log('logout');

      // 로그아웃 시 Recoil 전역 상태 업데이트
      setRole('');
    } catch (error) {
      console.log('Logout Error', error);
    }
  };

  return (
    <AuthContainer>
      {/* useEffect에 넣기 */}
      {/* {auth.currentUser ? '로그아웃' : '로그인'} */}
      <NavLink to="/write" onClick={onAuthCheckHandler} style={styledNav}>
        글쓰기
      </NavLink>
      {auth.currentUser ? (
        <>
          <NavLink to="/auth" onClick={onLogOutHandler} style={styledNav}>
            로그아웃
          </NavLink>
          <NavLink to="/mypage">My Page</NavLink>
          <UserInfo>
            <img src={auth.currentUser?.photoURL ?? defaultImg} alt="profile" />
            <span>{auth.currentUser?.displayName}</span>
            <span>
              <GoChevronDown />
            </span>
          </UserInfo>
        </>
      ) : (
        <>
          <NavLink to="/auth" onClick={() => setIsSignUp(false)} style={styledNav}>
            로그인
          </NavLink>
          <NavLink to="/auth" onClick={() => setIsSignUp(true)}>
            회원가입
          </NavLink>
        </>
      )}
    </AuthContainer>
  );
}

export default AuthNavBar;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  color: #888;
  font-size: 14px;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;

  color: black;
  font-weight: bold;

  & img {
    width: 30px;
    border-radius: 50%;
    object-fit: fill;
  }
  & button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border-color: transparent;
    padding: 0;
  }
`;
