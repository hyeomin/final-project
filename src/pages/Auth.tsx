import { useRecoilValue } from 'recoil';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { isSignUpState } from '../recoil/users';

function Auth() {
  const isSignUp = useRecoilValue(isSignUpState);

  return <>{isSignUp ? <Signup /> : <Login />}</>;
}

export default Auth;
