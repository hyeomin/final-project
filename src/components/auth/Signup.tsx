import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPhoneNumber,
  fetchSignInMethodsForEmail,
  updateProfile
} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isSignUpState } from '../../recoil/users';
import { auth, db } from '../../shared/firebase';
import St from './style';
import { SubmitHandler, useForm } from 'react-hook-form';
import mangoLogo from '../../assets/mangoLogo.png';
import usePrintError from '../../hooks/usePrintError';

export type Data = {
  email: string;
  password: string;
  passworkCheck?: string;
  nickname: string;
  phoneNumber: number;
  image?: string;
  defaultImg?: string;
  role?: string;
  newDisplayName?: string;
};

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passworkCheck, SetPassworkCheck] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const storage = getStorage();
  const [imageUpload, setImageUpload] = useState<any>('');
  const [image, setImage] = useState('');
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [errorMsg, setErrorMsg] = usePrintError('');
  const [isFormValid, setIsFormValid] = useState(true);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<Data>({ mode: 'onChange' });
  // 유효성 검사
  // 정규식
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const phoneRegex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
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

  const signUp: SubmitHandler<Data> = async ({ email, password, nickname, passworkCheck, phoneNumber }: Data) => {
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
      // setValue('phoneNumber', 0);

      // 회원가입 시, user 컬렉션에 값이 저장됨
      const userId = auth.currentUser?.uid;
      // 컬렉션에 있는 users 필드 정보 수정
      if (userId) {
        await setDoc(doc(db, 'users', userId), {
          userEmail: auth.currentUser?.email,
          displayName: auth.currentUser?.displayName,
          profileImg: auth.currentUser?.photoURL,
          uid: auth.currentUser?.uid,
          // phoneNumber: auth.currentUser?.phoneNumber,
          role: 'user'
        });
      }
    } catch (error) {
      setErrorMsg(error);
    }
  };

  // const emailCheck = async (email: string): Promise<void> => {
  //   const auth = getAuth();
  //   const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  //   const error = errorMsg;
  //   try {
  //     if (signInMethods.length > 0) {
  //       // 이메일이 데이터베이스에 이미 존재하는 경우
  //       setErrorMsg(error);
  //     } else {
  //       // 이메일이 데이터베이스에 없는 경우
  //       setErrorMsg(error);
  //     }
  //   } catch (error) {
  //     setErrorMsg(error);
  //   }
  // };

  // const emailCheck = async (email: string): Promise<void> => {
  //   const auth = getAuth();
  //   const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  //   const error = errorMsg;
  //   if (signInMethods.length > 0) {
  //     // 이메일이 데이터베이스에 이미 존재하는 경우
  //     setErrorMsg(error);
  //   } else {
  //     // 이메일이 데이터베이스에 없는 경우
  //     setErrorMsg(error);
  //   }
  // };

  // 이메일 중복체크 (firestore)
  const emailCheck = async (email: string) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('userEmail', '==', email));
    const querySnapshot = await getDocs(q);
    console.log('email', email);
    console.log('querySnapshot', querySnapshot);
    console.log('querySnapshot.docs.length', querySnapshot.docs.length);

    if (querySnapshot.docs.length > 0) {
      alert('이미 존재하는 이메일입니다.');
      setIsFormValid(false);
      setValue('email', '');
      // if (email === '') {
      //   emailInputRef.current?.focus();
      // }

      return;
    } else if (querySnapshot.docs.length === 0) {
      alert('사용 가능한 이메일입니다.');
      setIsFormValid(true);
    }
  };

  // 닉네임 중복체크
  const nicknameCheck = async (nickname: string) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('displayName', '==', nickname));
    const querySnapshot = await getDocs(q);
    console.log('nickname', nickname);
    console.log('querySnapshot', querySnapshot);
    console.log('querySnapshot.docs.length', querySnapshot.docs.length);

    if (querySnapshot.docs.length > 0) {
      alert('이미 존재하는 닉네임입니다.');
      setValue('nickname', '');
      setIsFormValid(false);
    }
    if (querySnapshot.docs.length === 0) {
      alert('사용 가능한 닉네임입니다.');
      setIsFormValid(true);
    }
  };

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
      <form style={{ width: '280px' }} onSubmit={handleSubmit(signUp)}>
        <St.InputContainer>
          <label htmlFor="email"></label>
          <St.AuthInput
            type="text"
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern: emailRegex
            })}
            // onChange={(e) => {
            //   setEmail(e.target.value);
            //   setErrorMsg('');
            // }}
          />
          <St.AuthBtn onClick={() => emailCheck(getValues('email'))}>중복확인</St.AuthBtn>
          {errors?.email?.type === 'required' && <St.WarningMsg>이메일을 입력해주세요</St.WarningMsg>}
          {errors?.email?.type === 'pattern' && <St.WarningMsg>이메일 양식에 맞게 입력해주세요</St.WarningMsg>}
        </St.InputContainer>
        <St.InputContainer>
          <label htmlFor="password"></label>
          <St.Input
            type="password"
            id="password"
            placeholder="Password (문자, 숫자 8자리 이상)"
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
          <label htmlFor="nickname"></label>
          <St.AuthInput
            type="text"
            id="nickname"
            placeholder="Nickname"
            {...register('nickname', {
              required: true,
              pattern: nicknameRegex
            })}
            // onChange={(e) => {
            //   setNickname(e.target.value);
            //   setErrorMsg('');
            // }}
          />
          <St.AuthBtn onClick={() => nicknameCheck(getValues('nickname'))}>중복확인</St.AuthBtn>
          {errors?.nickname?.type === 'required' && <St.WarningMsg>닉네임을 입력해주세요</St.WarningMsg>}
          {errors?.nickname?.type === 'pattern' && (
            <St.WarningMsg>닉네임은 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 입력해주세요</St.WarningMsg>
          )}
        </St.InputContainer>

        {/* <St.InputContainer>
          <St.AuthInput
            type="text"
            placeholder="phone number"
            {...register('phoneNumber', {
              required: true,
              pattern: phoneRegex
            })}
          />
          <St.AuthBtn>인증번호 발송</St.AuthBtn>

          {errors?.phoneNumber?.type === 'required' && (
            <St.WarningMsg> ⚠️ 정확한 휴대폰 양식을 입력해주세요</St.WarningMsg>
          )}
          {errors?.phoneNumber?.type === 'pattern' && (
            <St.WarningMsg>
               ⚠️ 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 입력해주세요,한글 초성 안됨 *
            </St.WarningMsg>
          )}
        </St.InputContainer> */}

        <St.SignUpAndLoginBtn
          type="submit"
          onClick={() => {
            signUp({ email, password, nickname, passworkCheck, phoneNumber });
          }}
          disabled={!isFormValid}
        >
          가입하기
        </St.SignUpAndLoginBtn>
        {errorMsg && <p>{errorMsg}</p>}
      </form>
      <St.ToggleLoginAndSignUp onClick={() => setIsSignUp(false)}>로그인으로 돌아가기</St.ToggleLoginAndSignUp>
    </St.authWrapper>
  );
}

export default Signup;
