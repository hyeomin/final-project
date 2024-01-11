import { signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isLoggedInState, isSignUpState, roleState } from '../recoil/users';
import { auth } from '../shared/firebase';

function AuthNavBar() {
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [role, setRole] = useRecoilState(roleState);

  const navigate = useNavigate();

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
      setIsLoggedIn(false);
      setRole('');
    } catch (error) {
      console.log('Logout Error', error);
    }
  };

  console.log('로그인 상태 리코일', isLoggedIn);
  console.log('회원가입 상태 리코일', isSignUp);

  return (
    <AuthContainer>
      <NavLink to="/write" onClick={onAuthCheckHandler}>
        Write
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/auth" onClick={onLogOutHandler}>
            Logout
          </NavLink>
          <NavLink to="/mypage">My Page</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/auth" onClick={() => setIsSignUp(false)}>
            Login
          </NavLink>
          <NavLink to="/auth" onClick={() => setIsSignUp(true)}>
            Signup
          </NavLink>
        </>
      )}
    </AuthContainer>
  );
}

export default AuthNavBar;

const AuthContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;
