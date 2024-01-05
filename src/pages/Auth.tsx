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
        <InputContainer>
          <SingleInputContainer>
            <span>아이디</span>
            <input type="text" placeholder="아이디를 입력하세요." />
          </SingleInputContainer>
          <SingleInputContainer>
            <span>비밀번호</span>
            <input type="password" placeholder="비밀번호를 입력하세요." />
          </SingleInputContainer>
          {isSignUp ? <Signup setIsSignUp={setIsSignUp} /> : <Login setIsSignUp={setIsSignUp} />}
        </InputContainer>
      </AuthContainer>
    </CS.FullContainer>
  );
}

export default Auth;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: pink;

  width: 500px;
  margin: 40px;
  padding: 20px;
`;

const SingleInputContainer = styled.div`
  display: flex;
  & span {
    background-color: lightblue;
    width: 100px;
  }

  & input {
    flex: 1;
  }
`;
