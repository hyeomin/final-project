import styled from 'styled-components';

type Props = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ setIsSignUp }: Props) {
  return (
    <>
      <button>로그인</button>
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
    </>
  );
}

export default Login;

const SignUpNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`;
