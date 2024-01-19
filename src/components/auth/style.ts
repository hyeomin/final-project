import styled from 'styled-components';
import theme from '../../styles/theme';

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 50px 0;
`;

const SubTitle = styled.div`
  color: ${theme.color.gray};
  font-size: 12px;
  margin-bottom: 10px;
`;

const SignUpTitle = styled.div`
  color: ${theme.color.gray};
  font-weight: 600;
  font-size: 14px;
  margin-top: 10px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
`;

const LogoBox = styled.div`
  display: flex;
`;

const MangoLogo = styled.img`
  width: 35px;
  height: 35px;
`;

const Logo = styled.div`
  font-family: ${theme.font.mango};
  color: ${theme.color.mangoMain};
  font-size: 35px;
`;

const InputContainer = styled.div`
  margin-top: 20px;
  /* margin-bottom: 10px; */
  width: 280px;
`;

const AuthInput = styled.input`
  width: 210px;
  height: 35px;
  margin-right: 10px;
  border-radius: 10px;
  padding-left: 15px;
  border: 1px solid ${theme.color.containerBorder};
  font-size: 12px;
  font-weight: 400;
  background-color: #f6f6f6;
`;

const Input = styled.input`
  width: 280px;
  height: 35px;
  font-size: 12px;
  font-weight: 300;
  padding-left: 15px;
  border: 1px solid ${theme.color.containerBorder};
  background-color: #f6f6f6;
  border-radius: 10px;
  /* margin-bottom: 5px; */
`;

const AuthBtn = styled.button`
  width: 60px;
  height: 35px;
  border-radius: 10px;
  border: none;
  background-color: ${theme.color.mangoMain};
  color: white;
  font-weight: 300;
  font-size: 10px;
  &:hover {
    background-color: #f59004;
  }
`;
const SignUpAndLoginBtn = styled.button`
  border: none;
  background-color: ${theme.color.mangoMain};
  width: 280px;
  height: 35px;
  color: white;
  margin-top: 30px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
  &:hover {
    background-color: #f59004;
  }
`;
const GoogleLoginBtn = styled.button`
  width: 280px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid #a9a9a9;
  background-color: #fff;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #222;
  &:hover {
    background-color: #f5f5f5;
  }
`;
const WarningMsg = styled.p`
  display: flex;
  color: red;
  font-size: 10px;
  margin-top: 7px;
  margin-left: 5px;
`;

const SignUpNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const ToggleLoginAndSignUp = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;

export default {
  SubTitle,
  SignUpTitle,
  InputContainer,
  AuthWrapper,
  WarningMsg,
  LogoContainer,
  LogoBox,
  MangoLogo,
  Logo,
  AuthInput,
  Input,
  AuthBtn,
  SignUpAndLoginBtn,
  SignUpNavigation,
  LoginContainer,
  GoogleLoginBtn,
  ToggleLoginAndSignUp
};
