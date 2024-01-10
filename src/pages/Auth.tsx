import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { isSignUpState } from '../recoil/users';
import CS from './CommonStyle';

function Auth() {
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);

  return (
    <CS.FullContainer>
      <AuthContainer>{isSignUp ? <Signup /> : <Login />}</AuthContainer>
    </CS.FullContainer>
  );
}

export default Auth;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
`;
