import { signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import defaultImg from '../../assets/defaultImg.jpg';
import { roleState } from '../../recoil/users';
import { auth } from '../../shared/firebase';
import theme from '../../styles/theme';

type Props = {
  setIsAuthToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthToggle({ setIsAuthToggleOpen }: Props) {
  const [userInfo, setUserInfo] = useState(auth.currentUser);
  const [role, setRole] = useRecoilState(roleState);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const prevPathname = useRef(pathname);

  // useEffect(() => {
  //   setUserInfo(auth.currentUser);
  // }, [auth.currentUser]);

  // 주소가 바뀌면 토글 창 꺼지게
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setIsAuthToggleOpen(false);
    }
  }, [pathname]);

  // 마이페이지로 이동 버튼
  const onNavigateMyPageHandler = () => {
    navigate('/mypage');
    setIsAuthToggleOpen(false);
  };

  const onLogOutHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmation = window.confirm('로그아웃하시겠습니까?');
    if (!confirmation) return;

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
          <AuthButton onClick={onNavigateMyPageHandler} bgcolor="#FFD864" bdrcolor="transparent">
            마이페이지
          </AuthButton>
          <AuthButton onClick={onLogOutHandler} bgcolor="#f6f6f6" bdrcolor={`${theme.color.gray}`}>
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
  top: 65px;
  right: 60px;
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
  border-radius: 20px;
  background-color: ${theme.color.veryLightGray};
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

interface AuthButtonProps {
  bgcolor: string;
  bdrcolor: string;
}

const AuthButton = styled.button<AuthButtonProps>`
  text-align: center;
  padding: 10px 5px;
  width: 120px;
  border-radius: 10px;
  background-color: ${(props) => props.bgcolor};
  border: 1px solid ${(props) => props.bdrcolor};
  cursor: pointer;
`;
