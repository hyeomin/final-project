import styled from 'styled-components';
import React, { useState } from 'react';
import St from './style';
import { auth, storage, db } from '../../shared/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

type Props = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ setIsSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmailhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePWhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 로그인
  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('userCredential', userCredential);
    } catch (error) {
      console.error(error);
    }
  };

  // 로그아웃
  const logOut = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('logout');
    await signOut(auth);
  };

  return (
    <St.authWrapper>
      <SingleInputContainer>
        <span>아이디</span>
        <input value={email} onChange={onChangeEmailhandler} type="text" placeholder="아이디를 입력하세요." />
      </SingleInputContainer>
      <SingleInputContainer>
        <span>비밀번호</span>
        <input type="password" value={password} onChange={onChangePWhandler} placeholder="비밀번호를 입력하세요." />
      </SingleInputContainer>
      <SingleInputContainer></SingleInputContainer>
      <button onClick={signIn}>로그인</button>
      <button onClick={logOut}>로그아웃</button>

      <SignUpNavigation>
        <p>아직 회원이 아니신가요?</p>
        <button
          onClick={() => {
            setIsSignUp(true);
          }}
        >
          회원가입 하기
        </button>
      </SignUpNavigation>
    </St.authWrapper>
  );
}

export default Login;

const SignUpNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
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
