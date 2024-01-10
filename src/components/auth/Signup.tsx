import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isSignUpState } from '../../recoil/users';
import { auth, db } from '../../shared/firebase';
import St from './style';

type Data = {
  email: string;
  password: string;
  nickname: string;
  image?: string;
  defaultImg?: string;
  role?: string;
};

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const storage = getStorage();
  const [imageUpload, setImageUpload] = useState<any>('');
  const [image, setImage] = useState('');

  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);

  const onChangeEmailhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePWhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeNicknamehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 파일이 업로드되면 스토리지에 업로드하고 다운 즉시 이미지가 보여짐
  // 폴더/파일
  useEffect(() => {
    const imageRef = ref(storage, 'userProfile/' + `${auth.currentUser?.uid}`);
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
      });
    });
  }, [imageUpload]);

  //회원가입
  useEffect(() => {
    //로그인이 되면 사용자의 정보를 가지고 온다
    onAuthStateChanged(auth, (user) => {
      console.log('user', user?.photoURL);
    });
  }, []);

  const signUp = async ({ email, password, nickname }: Data) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log('userCredential', userCredential);
      const user = userCredential.user;
      if (user !== null) {
        await updateProfile(user, {
          displayName: nickname,
          photoURL: ''
        });
      } else return;
      setEmail('');
      setPassword('');
      setNickname('');
      // 회원가입 시, user 컬렉션에 값이 저장됨
      const userId = auth.currentUser?.uid;
      // 컬렉션에 있는 users 필드 정보 수정
      if (userId) {
        await setDoc(doc(db, 'users', userId), {
          displayName: auth.currentUser?.displayName,
          profileImg: auth.currentUser?.photoURL,
          uid: auth.currentUser?.uid,
          role: 'user'
        });
      }
    } catch (error) {
      console.error('에러입니다');
    }
  };

  return (
    <St.authWrapper>
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
          signUp({ email, password, nickname });
        }}
      >
        회원가입
      </button>
      <button onClick={() => setIsSignUp(false)}>로그인으로 돌아가기</button>
    </St.authWrapper>
  );
}

export default Signup;
