import { useRecoilState } from 'recoil';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { auth } from '../shared/firebase';
import { isSignUpState } from '../recoil/users';

function Auth() {
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  return <>{isSignUp ? <Signup /> : <Login />}</>;
}

export default Auth;
