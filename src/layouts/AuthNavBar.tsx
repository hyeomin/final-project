import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isSignUpState, roleState } from '../recoil/users';
import { auth } from '../shared/firebase';

type Props = {
  styledNav: ({ isActive }: { isActive: boolean }) => {
    color: string;
  };
};

function AuthNavBar({ styledNav }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!auth.currentUser);

  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [role, setRole] = useRecoilState(roleState);

  useEffect(() => {
    if (!auth.currentUser) setIsLoggedIn(false);
    if (!isLoggedIn) setRole('');
  }, [isLoggedIn, auth.currentUser]);

  console.log('이미지 찾자', auth);

  const onAuthCheckHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // event.preventDefault();
    // if (!isLoggedIn) {
    //   const confirmation = window.confirm('로그인이 필요합니다. 로그인 창으로 이동하시겠습니까?');
    //   if (confirmation) {
    //     navigate('/auth');
    //   } else {
    //     navigate('/');
    //   }
    // } else navigate('/write');
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
      <NavLink to="/write" onClick={onAuthCheckHandler} style={styledNav}>
        Write
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/auth" onClick={onLogOutHandler} style={styledNav}>
            로그아웃
          </NavLink>
          <NavLink to="/mypage">My Page</NavLink>
          <div></div>
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
  column-gap: 20px;
  color: #888;
  font-size: 14px;
`;
