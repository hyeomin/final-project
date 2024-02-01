import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isSignUpState } from '../../../recoil/users';
import editNdeleteToggleBox from '../../../assets/editndeletetoggle.png';
import { isAuthState } from '../../../recoil/modals';

type ModalProps = {
  onClose: () => void;
};

function LoginModal({ onClose }: ModalProps) {
  const setIsSignUp = useSetRecoilState(isSignUpState);
  //const [isAuth, setIsAuth] = useRecoilState(isAuthState);
  const setIsAuth = useSetRecoilState(isAuthState);
  // // 선택되면 노란색으로 NavBar 이름 스타일 바뀌게
  // const styledNav = ({ isActive }: { isActive: boolean }) => {
  //   return { color: isActive ? '#FFA114' : '' };
  // };

  const clickSignUpFalse = () => {
    setIsSignUp(false);
    setIsAuth(true);
  };

  const clickSignUpTrue = () => {
    setIsSignUp(true);
    setIsAuth(true);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent>
        <Link to="/auth" onClick={() => clickSignUpFalse}>
          <p>로그인</p>
        </Link>
        <StyledNavLnk to="/auth" onClick={() => clickSignUpTrue}>
          <p>회원가입</p>
        </StyledNavLnk>
      </ModalContent>
    </ModalBackdrop>
  );
}

export default LoginModal;

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-image: url(${editNdeleteToggleBox});
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: transparent;

  position: absolute;
  padding: 25px;
  width: 120px;
  height: 90px;
  top: 52px;
  right: 10px;

  //background: white;
  //border-radius: 10px;
  //box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const StyledNavLnk = styled(NavLink)`
  font-weight: normal;
`;
