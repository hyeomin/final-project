import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPhoneNumber,
  fetchSignInMethodsForEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isSignUpState } from '../../recoil/users';
import { auth, db } from '../../shared/firebase';
import St from './style';
import { SubmitHandler, useForm } from 'react-hook-form';
import mangoLogo from '../../assets/mangoLogo.png';

export type Data = {
  email: string;
  password: string;
  passworkCheck: string;
  nickname?: string;
  phoneNumber?: string;
  image?: string;
  defaultImg?: string;
  role?: string;
  // emailToCheck?:string;
};

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passworkCheck, SetPassworkCheck] = useState('');

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

  // const checkDuplicateEmail = async ({ email }: Data) => {
  //   try {
  //     const auth = getAuth();

  //     const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  //     if (signInMethods.length > 0) {
  //       // 이미 가입된 이메일입니다.
  //       console.log('중복된 이메일입니다.');
  //       return true;
  //     } else {
  //       console.log('사용 가능한 이메일입니다.');
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('이메일 중복 확인 중 오류 발생:', error);
  //   }
  // };

  const signUp: SubmitHandler<Data> = async ({ email, password, nickname, passworkCheck }: Data) => {
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
      setValue('email', '');
      setValue('password', '');
      setValue('nickname', '');
      setValue('passworkCheck', '');
      setValue('phoneNumber', '');

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

  // const onHandleEmailCheck = async ({ email }: Data) => {
  //   const emailToCheck = email;
  //   try {
  //     const isDuplicate = await checkDuplicateEmail({ email });
  //     if (isDuplicate) {
  //       // 이미 가입된 이메일입니다.
  //     } else {
  //       // 사용 가능한 이메일입니다.
  //     }
  //   } catch (error) {
  //     console.error('이메일 중복 체크 오류:', error);
  //   }
  // };

  return (
    <St.authWrapper>
      <St.LogoContainer>
        <St.SubTitle>건강한 친환경 습관 만들기</St.SubTitle>
        <St.LogoBox>
          <St.MangoLogo src={mangoLogo} />
          <St.Logo>MANGO</St.Logo>
        </St.LogoBox>
        <St.SignUpTitle>회원가입</St.SignUpTitle>
      </St.LogoContainer>
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
          <St.AuthBtn>이메일 중복확인</St.AuthBtn>
          {errors?.email?.type === 'required' && <St.WarningMsg>이메일을 입력해주세요</St.WarningMsg>}
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

          {errors?.password?.type === 'required' && <St.WarningMsg>비밀번호를 입력해주세요</St.WarningMsg>}
          {errors?.password?.type === 'pattern' && (
            <St.WarningMsg>비밀번호는 문자, 숫자 1개이상 포함, 8자리 이상입니다</St.WarningMsg>
          )}
        </St.InputContainer>
        <St.InputContainer>
          {/* <span>닉네임</span> */}
          <St.Input
            type="password"
            placeholder="Confirm Password"
            {...register('passworkCheck', {
              required: true,
              validate: {
                check: (val) => {
                  if (getValues('password') !== val) {
                    return '비밀번호 불일치';
                  }
                }
              }
            })}
          />

          {errors?.passworkCheck?.type === 'required' && <St.WarningMsg>비밀번호를 입력해주세요</St.WarningMsg>}
          {errors?.passworkCheck && <St.WarningMsg>비밀번호가 일치하지 않습니다</St.WarningMsg>}
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
            signUp({ email, password, nickname, passworkCheck });
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
