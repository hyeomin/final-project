import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { isSignUpState } from '../recoil/users';

function Auth() {
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);

  return <AuthContainer>{isSignUp ? <Signup /> : <Login />}</AuthContainer>;
}

export default Auth;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
`;
