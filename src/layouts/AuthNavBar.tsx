import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isLoggedInState, isSignUpState } from '../recoil/users';

function AuthNavBar() {
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const navigate = useNavigate();

  const onAuthCheckHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // if (!isLoggedIn) {
    //   const confirmation = window.confirm('로그인이 필요합니다. 로그인 창으로 이동하시겠습니까?');
    //   if (confirmation) {
    //     navigate('/auth');
    //   } else {
    //     event.preventDefault();
    //   }
    // }
  };

  return (
    <AuthContainer>
      <NavLink to="/write" onClick={onAuthCheckHandler}>
        Write
      </NavLink>
      {isLoggedIn ? (
        <NavLink to="/auth" onClick={() => setIsSignUp(false)}>
          Logout
        </NavLink>
      ) : (
        <>
          <NavLink to="/auth" onClick={() => setIsSignUp(false)}>
            Login
          </NavLink>
          <NavLink to="/auth" onClick={() => setIsSignUp(true)}>
            Signup
          </NavLink>
          <NavLink to="/mypage">My Page</NavLink>
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
