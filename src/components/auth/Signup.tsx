import { createUserWithEmailAndPassword, getAuth, signInWithPhoneNumber, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isSignUpState } from '../../recoil/users';
import { auth, db } from '../../shared/firebase';
import St from './style';
import { SubmitHandler, useForm } from 'react-hook-form';

export type Data = {
  email: string;
  password: string;
  nickname?: string;
  phoneNumber?: string;
  image?: string;
  defaultImg?: string;
  role?: string;
};

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const storage = getStorage();
  const [imageUpload, setImageUpload] = useState<any>('');
  const [image, setImage] = useState('');
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  // const phoneNumber = getPhoneNumberFromUserInput();
  // const appVerifier = window.recaptchaVerifier;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm<Data>({ mode: 'onChange' });

  // 유효성 검사
  // 정규식
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
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

  const signUp: SubmitHandler<Data> = async ({ email, password, nickname, phoneNumber }: Data) => {
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
      setPhoneNum('');
      // 회원가입 시, user 컬렉션에 값이 저장됨
      const userId = auth.currentUser?.uid;
      // 컬렉션에 있는 users 필드 정보 수정
      if (userId) {
        await setDoc(doc(db, 'users', userId), {
          displayName: auth.currentUser?.displayName,
          profileImg: auth.currentUser?.photoURL,
          uid: auth.currentUser?.uid,
          phoneNum: auth.currentUser?.phoneNumber,
          role: 'user'
        });
      }
    } catch (error) {
      console.error('에러입니다');
    }
  };

  return (
    <St.authWrapper>
      <St.SubTitle>건강한 친환경 습관 만들기</St.SubTitle>
      <St.Logo>MANGO</St.Logo>
      <St.SignUpTitle>회원가입</St.SignUpTitle>
      <form onSubmit={handleSubmit(signUp)}>
        <St.InputContainer>
          <label htmlFor="email"></label>
          <St.AuthInput
            type="text"
            placeholder="email"
            {...register('email', {
              required: true,
              pattern: emailRegex
            })}
          />
          <St.AuthBtn>중복확인</St.AuthBtn>
          {errors?.email?.type === 'required' && <St.WarningMsg> 이메일을 입력해주세요</St.WarningMsg>}
          {errors?.email?.type === 'pattern' && <St.WarningMsg>이메일 양식에 맞게 입력해주세요</St.WarningMsg>}
        </St.InputContainer>
        <St.InputContainer>
          <label htmlFor="password"></label>
          <St.Input
            type="password"
            id="password"
            placeholder="password (문자, 숫자 8자리 이상)"
            {...register('password', {
              required: true,
              pattern: passwordRegex
            })}
          />

          {errors?.password?.type === 'required' && <St.WarningMsg> ⚠️ 비밀번호를 입력해주세요</St.WarningMsg>}
          {errors?.password?.type === 'pattern' && (
            <St.WarningMsg> ⚠️ 비밀번호는 문자, 숫자 1개이상 포함, 8자리 이상입니다</St.WarningMsg>
          )}
        </St.InputContainer>
        <St.InputContainer>
          {/* <span>닉네임</span> */}
          <St.AuthInput
            type="text"
            placeholder="nickname"
            {...register('nickname', {
              required: true,
              pattern: nicknameRegex
            })}
          />
          <St.AuthBtn>중복확인</St.AuthBtn>

          {errors?.nickname?.type === 'required' && <St.WarningMsg> ⚠️ 닉네임을 입력해주세요</St.WarningMsg>}
          {errors?.nickname?.type === 'pattern' && (
            <St.WarningMsg>⚠️ 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 입력해주세요,한글 초성 안됨</St.WarningMsg>
          )}
        </St.InputContainer>
        <St.InputContainer>
          {/* <span>휴대폰번호</span> */}
          <St.AuthInput
            type="text"
            placeholder="phone number"
            // {...register('phoneNum', {
            //   required: true,
            //   pattern: phoneRegex
            // })}
          />
          <St.AuthBtn>인증번호 발송</St.AuthBtn>

          {/* {errors?.phoneNum?.type === 'required' && (
            <St.WarningMsg> ⚠️ 정확한 휴대폰 양식을 입력해주세요</St.WarningMsg>
          )}
          {errors?.phoneNum?.type === 'pattern' && (
            <St.WarningMsg>
              {' '}
              ⚠️ 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 입력해주세요,한글 초성 안됨
            </St.WarningMsg>
          )} */}
        </St.InputContainer>

        <St.SignUpAndLoginBtn
          type="submit"
          onClick={() => {
            signUp({ email, password, nickname });
          }}
        >
          가입하기
        </St.SignUpAndLoginBtn>
      </form>
      <span onClick={() => setIsSignUp(false)}>로그인으로 돌아가기</span>
    </St.authWrapper>
  );
}

export default Signup;
