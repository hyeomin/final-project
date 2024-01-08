import styled from 'styled-components';
import { useEffect, useState } from 'react';
import St from './style';
import { auth } from '../../shared/firebase';
import { getAuth, updateProfile } from 'firebase/auth';
import React from 'react';
import defaultImg from '../../assets/defaultImg.jpg';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

type Props = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function Signup({ setIsSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeEmailhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePWhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeNicknamehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('user', user);
      await updateProfile(user, { displayName: name });
    } catch (error) {
      console.error('에러입니다');
    }
  };

  return (
    <St.authWrapper>
      <St.profileImg src={defaultImg} alt="defaultImg" />

      <St.InputContainer>
        <span>아이디</span>
        <input value={email} onChange={onChangeEmailhandler} type="text" placeholder="아이디를 입력하세요." />
      </St.InputContainer>
      <St.InputContainer>
        <span>비밀번호</span>
        <input type="password" value={password} onChange={onChangePWhandler} placeholder="비밀번호를 입력하세요." />
      </St.InputContainer>
      <St.InputContainer>
        <span>닉네임</span>
        <input type="text" value={nickname} onChange={onChangeNicknamehandler} placeholder="닉네임을 입력하세요." />
      </St.InputContainer>

      <button
        type="submit"
        onClick={() => {
          signUp(email, password, nickname);
        }}
      >
        회원가입
      </button>
      <button onClick={() => setIsSignUp(false)}>로그인으로 돌아가기</button>
    </St.authWrapper>
  );
}

export default Signup;
