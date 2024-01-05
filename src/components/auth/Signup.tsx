import styled from 'styled-components';

type Props = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function Signup({ setIsSignUp }: Props) {
  return (
    <>
      <SingleInputContainer>
        <span>닉네임</span>
        <input type="text" placeholder="닉네임을 입력하세요." />
      </SingleInputContainer>
      <button>회원가입</button>
      <button onClick={() => setIsSignUp(false)}>로그인으로 돌아가기</button>
    </>
  );
}

export default Signup;

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
