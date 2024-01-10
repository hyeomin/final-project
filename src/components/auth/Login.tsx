import { useQuery } from '@tanstack/react-query';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getAllUsers } from '../../api/authApi';
import { QUERY_KEYS } from '../../query/keys';
import { isLoggedInState, isSignUpState, roleState } from '../../recoil/users';
import { auth } from '../../shared/firebase';
import St from './style';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [role, setRole] = useRecoilState(roleState);

  const navigate = useNavigate();

  const onChangeEmailhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePWhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  // 로그인
  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('userCredential', userCredential);

      // 로그인 성공 시 role의 recoil(전역상태) update
      const user = userList && userList.find((user) => user.uid === userCredential.user.uid);
      if (user) setRole(user.role);

      // 로그인 성공 시 isLoggedinState(true)로 업데이트
      setIsLoggedIn(true);

      // home으로 이동
      navigate('/');
    } catch (error) {
      window.alert(error);
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
