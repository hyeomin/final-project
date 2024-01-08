import { useState } from 'react';
import styled from 'styled-components';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import CS from './CommonStyle';

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <CS.FullContainer>
      <AuthContainer>
        {isSignUp ? <Signup setIsSignUp={setIsSignUp} /> : <Login setIsSignUp={setIsSignUp} />}
      </AuthContainer>
    </CS.FullContainer>
  );
}

export default Auth;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
`;
