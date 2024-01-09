import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import St from './style';
import { auth, db, storage } from '../../shared/firebase';
import { getAuth, updateProfile } from 'firebase/auth';
import defaultImg from '../../assets/defaultImg.jpg';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

type Props = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

type Data = {
  email: string;
  password: string;
  nickname: string;
  image?: string;
  role?: string;
};

function Signup({ setIsSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const storage = getStorage();
  const [imageUpload, setImageUpload] = useState<any>('');
  const [image, setImage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onChangeEmailhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePWhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeNicknamehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  //div를 클릭해도 input이 클릭되도록 하기
  const onClickUpload = () => {
    fileRef.current?.click();
  };

  //input을 클릭해서 파일 업로드
  //사진 미리보기
  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(uploadedFile);
      setImageUpload(uploadedFile);
    }
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

  const signUp = async ({ email, password, nickname, image }: Data) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log('userCredential', userCredential);
      const user = userCredential.user;
      if (user !== null) {
        await updateProfile(user, {
          displayName: nickname,
          photoURL: image
        });
      } else return;
      setEmail('');
      setPassword('');
      setNickname('');
      // 회원가입 시, user 컬렉션에 값이 저장됨
      const docRef = await addDoc(collection(db, 'users'), {
        displayName: auth.currentUser?.displayName,
        profileImg: auth.currentUser?.photoURL,
        uid: auth.currentUser?.uid,
        role: 'user'
      });
    } catch (error) {
      console.error('에러입니다');
    }
  };

  return (
    <St.authWrapper>
      <St.profileImg src={previewImage || defaultImg} alt="img" />
      {/* {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100px', height: '100px' }} />} */}
      <label>프로필선택</label>

      <br />
      <input type="file" onChange={onChangeUpload} />
      <button onClick={onClickUpload}>업로드</button>
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
          signUp({ email, password, nickname, image: image });
        }}
      >
        회원가입
      </button>
      <button onClick={() => setIsSignUp(false)}>로그인으로 돌아가기</button>
    </St.authWrapper>
  );
}

export default Signup;
