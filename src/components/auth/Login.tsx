import { useQuery } from '@tanstack/react-query';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getAllUsers } from '../../api/authApi';
import googleLogo from '../../assets/icons/googleLogo.png';
import mangoLogo from '../../assets/mangoLogo.png';
import { QUERY_KEYS } from '../../query/keys';
import { isSignUpState, roleState } from '../../recoil/users';
import { auth, db } from '../../shared/firebase';
import { Data } from './Signup';
import St from './style';

interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [userData, setUserData] = useState<UserData | null>(null);
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
      const user = userList && userList.find((user) => user.uid === auth.currentUser?.uid);
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

  //구글 로그인
  function handleGoogleLogin() {
    // const auth = getAuth();
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log('너누구냐', data);
        // console로 들어온 데이터 표시

        const user = data.user;
        // 구글로그인 null값으로 들어옴
        // if (user !== null) {
        //   updateProfile(user, {
        //     displayName: nickname,
        //     photoURL: ''
        //   });
        // } else return;
        // 회원가입 시, user 컬렉션에 값이 저장됨
        const userId = auth.currentUser?.uid;
        // 컬렉션에 있는 users 필드 정보 수정
        if (userId) {
          setDoc(doc(db, 'users', userId), {
            displayName: auth.currentUser?.displayName,
            profileImg: auth.currentUser?.photoURL,
            uid: auth.currentUser?.uid,
            phoneNum: auth.currentUser?.phoneNumber,
            role: 'user'
          });
        }
        navigate('/');
      })

      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <St.authWrapper>
      <St.LogoContainer>
        <St.SubTitle>건강한 친환경 습관 만들기</St.SubTitle>
        <St.LogoBox>
          <St.MangoLogo src={mangoLogo} />
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
          {errors?.password?.type === 'pattern' && (
            <St.WarningMsg>비밀번호는 문자, 숫자 1개이상 포함, 8자리 이상입니다</St.WarningMsg>
          )}
        </St.InputContainer>
        <St.LoginContainer>
          <St.SignUpAndLoginBtn type="submit">로그인</St.SignUpAndLoginBtn>
          <St.GoogleLoginBtn onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google Icon" />
            &nbsp;구글로그인
          </St.GoogleLoginBtn>
        </St.LoginContainer>

        {/* <button onClick={logOut}>로그아웃</button> */}

        <St.SignUpNavigation>
          <p style={{ marginBottom: '15px', fontSize: '15px' }}>아직 회원이 아니신가요?</p>
          <St.ToggleLoginAndSignUp
            onClick={() => {
              setIsSignUp(true);
            }}
          >
            회원가입 하기
          </St.ToggleLoginAndSignUp>
        </St.SignUpNavigation>
      </form>
    </St.authWrapper>
  );
}

export default Login;
