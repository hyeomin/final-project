import styled from 'styled-components';
import theme from '../../styles/theme';

const authWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 50px 0;
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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  width: 480px;
  border-bottom: 1px solid #d9d9d9;
`;

const LogoBox = styled.div`
  display: flex;
`;

const MangoLogo = styled.img``;

const Logo = styled.div`
  font-family: ${theme.font.mango};
  color: ${theme.color.mangoMain};
  font-size: 50px;
`;

const InputContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 500px;
`;

const AuthInput = styled.input`
  width: 330px;
  height: 60px;
  margin-right: 10px;
  border-radius: 10px;
  padding-left: 10px;
  border: 1px solid ${theme.color.containerBorder};
  font-size: 16px;
  font-weight: 400;
  background-color: #f6f6f6;
`;

const Input = styled.input`
  width: 480px;
  height: 60px;
  font-size: 16px;
  font-weight: 400;
  padding-left: 10px;
  border: 1px solid ${theme.color.containerBorder};
  background-color: #f6f6f6;
  border-radius: 10px;
`;

const AuthBtn = styled.button`
  width: 140px;
  height: 60px;
  border-radius: 10px;
  border: none;
  background-color: ${theme.color.mangoMain};
  color: white;
  font-weight: 400;
`;
const SignUpAndLoginBtn = styled.button`
  border: none;
  background-color: ${theme.color.mangoMain};
  width: 480px;
  height: 60px;
  color: white;
  margin-top: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: 700;
`;

const WarningMsg = styled.p`
  color: red;
  font-size: 15px;
  margin-top: 10px;
`;

export default {
  SubTitle,
  SignUpTitle,
  InputContainer,
  authWrapper,
  WarningMsg,
  LogoContainer,
  LogoBox,
  MangoLogo,
  Logo,
  AuthInput,
  Input,
  AuthBtn,
  SignUpAndLoginBtn
};
