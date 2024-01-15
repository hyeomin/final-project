import { useQuery } from '@tanstack/react-query';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getAllUsers } from '../../api/authApi';
import { QUERY_KEYS } from '../../query/keys';
import { isSignUpState, roleState } from '../../recoil/users';
import { auth } from '../../shared/firebase';
import { Data } from './Signup';
import St from './style';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [role, setRole] = useRecoilState(roleState);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm<Data>({ mode: 'onChange' });

  const navigate = useNavigate();

  // const onChangeEmailhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };
  // const onChangePWhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  // 로그인
  const signIn: SubmitHandler<Data> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('userCredential', userCredential);

      // 로그인 성공 시 role의 recoil(전역상태) update
      const user = userList && userList.find((user) => user.uid === userCredential.user.uid);
      if (user) {
        setRole(user.role);
      }

      // home으로 이동
      navigate('/');
    } catch (error) {
      window.alert(error);
      console.error(error);
    }
  };

  // // 로그아웃
  // const logOut = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('logout');
  //   await signOut(auth);
  // };

  return (
    <St.authWrapper>
      <form onSubmit={handleSubmit(signIn)}>
        <SingleInputContainer>
          <span>아이디</span>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            {...register('email', {
              required: true,
              pattern: emailRegex
            })}
          />
          {errors?.email?.type === 'required' && <St.WarningMsg> 이메일을 입력해주세요</St.WarningMsg>}
          {errors?.email?.type === 'pattern' && <St.WarningMsg>이메일 양식에 맞게 입력해주세요</St.WarningMsg>}
        </SingleInputContainer>
        <SingleInputContainer>
          <span>비밀번호</span>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register('password', {
              required: true,
              pattern: passwordRegex
            })}
          />
          {errors?.password?.type === 'required' && <St.WarningMsg> ⚠️ 비밀번호를 입력해주세요</St.WarningMsg>}
          {errors?.password?.type === 'pattern' && (
            <St.WarningMsg> ⚠️ 비밀번호는 문자, 숫자 1개이상 포함, 8자리 이상입니다</St.WarningMsg>
          )}
        </SingleInputContainer>
        <SingleInputContainer></SingleInputContainer>
        <button type="submit">로그인</button>
        {/* <button onClick={logOut}>로그아웃</button> */}

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
      </form>
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
