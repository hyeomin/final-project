import { signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import defaultImg from '../../assets/defaultImg.jpg';
import { roleState } from '../../recoil/users';
import { auth } from '../../shared/firebase';

type Props = {
  setIsAuthToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthToggle({ setIsAuthToggleOpen }: Props) {
  const [userInfo, setUserInfo] = useState(auth.currentUser);
  const [role, setRole] = useRecoilState(roleState);

  const navigate = useNavigate();
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    setUserInfo(auth.currentUser);
  }, [auth.currentUser]);

  // 주소가 바뀌면 토글 창 꺼지게
  useEffect(() => {
    if (location.pathname !== prevPathname.current) {
      setIsAuthToggleOpen(false);
    }
  }, [location.pathname]);

  // 마이페이지로 이동 버튼
  const onNavigateMyPageHandler = () => {
    navigate('/mypage');
    setIsAuthToggleOpen(false);
  };

  const onLogOutHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log('logout');

      // 로그아웃 시 Recoil 전역 상태 업데이트
      setRole('');
      setIsAuthToggleOpen(false);
    } catch (error) {
      console.log('Logout Error', error);
    }
  };

  return (
    <ToggleContainer>
      <ToggleBox>
        <span>{userInfo?.email}</span>
        <ProfileImageContainer>
          {/* <PenWrapper>
            <GoPencil />
          </PenWrapper> */}
          <img src={userInfo?.photoURL ?? defaultImg} alt="profile" />
        </ProfileImageContainer>
        <span>{`안녕하세요, ${userInfo?.displayName}님`}</span>
        <ButtonContainer>
          <AuthButton onClick={onNavigateMyPageHandler} bgColor="#FFD864" bdrColor="#888888">
            마이페이지
          </AuthButton>
          <AuthButton onClick={onLogOutHandler} bgColor="transparent" bdrColor="#222222">
            로그아웃
          </AuthButton>
        </ButtonContainer>
      </ToggleBox>
    </ToggleContainer>
  );
}

export default AuthToggle;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: end;
  font-size: 14px;
  position: absolute;
  top: 60px;
  right: 120px;
  z-index: 100;
`;

const ToggleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  width: 320px;
  height: 320px;
  background-color: #d9d9d9;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 90px;
  position: relative;
  overflow: hidden;

  & img {
    object-fit: contain;
    border-radius: 50%;
    width: 100%;
  }
`;

const PenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 25px;
  height: 25px;
  right: 0px;
  bottom: 0px;
  border-radius: 50%;
  background-color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

interface AuthButtonProps {
  bgColor: string;
  bdrColor: string;
}

const AuthButton = styled.button<AuthButtonProps>`
  text-align: center;
  padding: 10px 5px;
  width: 120px;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.bdrColor};
  cursor: pointer;
`;
