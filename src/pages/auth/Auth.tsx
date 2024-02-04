import { useRecoilState } from 'recoil';
import { isSignUpState } from '../../recoil/users';
import Login from './components/Login';
import Signup from './components/Signup';

function Auth() {
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);

  return <>{isSignUp ? <Signup /> : <Login />}</>;
}

export default Auth;
