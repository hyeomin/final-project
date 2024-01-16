import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { auth } from '../shared/firebase';

function Auth() {
  return <>{auth.currentUser ? <Signup /> : <Login />}</>;
}

export default Auth;
