import styled from 'styled-components';
import theme from '../../styles/theme';

const authWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  align-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SubTitle = styled.div`
  color: ${theme.color.lightgray};
  font-size: 15px;
  margin-bottom: 10px;
`;

const SignUpTitle = styled.div`
  color: ${theme.color.gray};
  font-weight: 600;
  font-size: 18px;
  margin-top: 10px;
`;
const Logo = styled.div`
  font-family: ${theme.font.mango};
  color: ${theme.color.mangoMain};
  font-size: 50px;
`;

const InputContainer = styled.div`
  margin-top: 20px;
  width: 500px;
`;

const AuthInput = styled.input`
  width: 350px;
  height: 40px;
  margin-right: 10px;
  border-radius: 10px;
  padding-left: 10px;
  border: 1px solid ${theme.color.lightgray};
`;

const Input = styled.input`
  width: 460px;
  height: 40px;
  padding-left: 10px;

  border: 1px solid ${theme.color.lightgray};
  border-radius: 10px;
`;

const AuthBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${theme.color.mangoMain};
  color: white;
`;
const SignUpAndLoginBtn = styled.button`
  border: none;
  background-color: ${theme.color.mangoMain};
  width: 460px;
  height: 40px;
  color: white;
  margin-top: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const WarningMsg = styled.p`
  color: red;
`;

export default {
  SubTitle,
  SignUpTitle,
  InputContainer,
  authWrapper,
  WarningMsg,
  Logo,
  AuthInput,
  Input,
  AuthBtn,
  SignUpAndLoginBtn
};
