import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from 'api/authApi';
import googleLogo from 'assets/icons/googleLogo.png';
import mangofavicon from 'assets/mango-favicon.png';
import { AuthContext } from 'context/AuthContext';
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useModal } from 'hooks/useModal';
import usePrintError from 'hooks/usePrintError';
import { QUERY_KEYS } from 'query/keys';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'recoil/modals';
import { isSignUpState, roleState } from 'recoil/users';
import { auth, db } from 'shared/firebase';
import { Data } from './Signup';
import St from './style';
interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
}

function Login() {
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMsg, setErrorMsg] = usePrintError('');

  const setIsSignUp = useSetRecoilState(isSignUpState);
  const setRole = useSetRecoilState(roleState);

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Data>({ mode: 'onChange' });

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-ZS]).{1,}/;

  const { data: userList, error } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  console.log('login');

  if (error) {
    console.log('전체 유저리스트 가져오기 실패(Login)', error);
  }

  useEffect(() => {
    if (errorMsg) {
      const onClickSave = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
        modal.close();
        setErrorMsg('');
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '[로그인 오류]',
        message: errorMsg,
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
    }
  }, [errorMsg]);

  // 로그인

  const signIn: SubmitHandler<Data> = async (data) => {
    setPersistence(auth, browserSessionPersistence);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

      // 로그인 성공 시 role, authCurrentUser의 recoil(전역상태) update
      const user = userList && userList.find((user) => user.uid === authCurrentUser?.uid);
      if (user && auth) {
        setRole(user.role);
      }

      // home으로 이동
      navigate('/');
    } catch (error) {
      setErrorMsg(error);
      setValue('email', '');
      setValue('password', '');
    }
  };

  //구글 로그인

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      const result = await signInWithPopup(auth, provider); // popup을 이용한 signup

      const user = result.user;
      setUserData(user);

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

      navigate('/');
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <St.AuthWrapper>
      <St.LogoContainer>
        <St.SubTitle>건강한 친환경 습관 만들기</St.SubTitle>
        <St.LogoBox>
          <St.MangoLogo src={mangofavicon} />
          <St.Logo>MANGO</St.Logo>
        </St.LogoBox>
        <St.SignUpTitle>로그인</St.SignUpTitle>
      </St.LogoContainer>

      <form onSubmit={handleSubmit(signIn)}>
        <St.InputContainer>
          <label htmlFor="email"></label>
          <St.Input
            type="text"
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern: emailRegex
            })}
          />
          {errors?.email?.type === 'required' && <St.WarningMsg> 이메일을 입력해주세요</St.WarningMsg>}
          {errors?.email?.type === 'pattern' && <St.WarningMsg>이메일 양식에 맞게 입력해주세요</St.WarningMsg>}
        </St.InputContainer>
        <St.InputContainer>
          <label htmlFor="password"></label>
          <St.Input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: true,
              pattern: passwordRegex
            })}
          />
          {errors?.password?.type === 'required' && <St.WarningMsg>비밀번호를 입력해주세요</St.WarningMsg>}
        </St.InputContainer>
        <St.LoginContainer>
          <St.SignUpAndLoginBtn type="submit">로그인</St.SignUpAndLoginBtn>
          <St.GoogleLoginBtn onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google Icon" />
            &nbsp;구글로그인
          </St.GoogleLoginBtn>
        </St.LoginContainer>

        <St.SignUpNavigation>
          <St.ToggleLoginAndSignUp
            onClick={() => {
              setIsSignUp(true);
            }}
          >
            회원가입 하기
          </St.ToggleLoginAndSignUp>
        </St.SignUpNavigation>
      </form>
    </St.AuthWrapper>
  );
}

export default Login;
