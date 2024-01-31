import { signOut } from 'firebase/auth';
import { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import defaultImg from '../../assets/defaultImg.jpg';
import { AuthContext } from '../../context/AuthContext';
import { useModal } from '../../hooks/useModal';
import { modalState } from '../../recoil/modals';
import { roleState } from '../../recoil/users';
import { auth } from '../../shared/firebase';
import theme from '../../styles/theme';

type Props = {
  setIsAuthToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthToggle({ setIsAuthToggleOpen }: Props) {
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);
  const setRole = useSetRecoilState(roleState);
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  // const userInfo = auth.currentUser;

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

  const onLogOutHandler = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      ////모달팝업 적용(혜민)
      const onClickCancel = () => {
        modal.close();
        return;
      };

      const onClickLogout = async () => {
        modal.close();

        try {
          await signOut(auth);
          //console.log('logout');

          // 로그아웃 시 Recoil 전역 상태 업데이트
          setRole('');
          setIsAuthToggleOpen(false);
          navigate('/home');
        } catch (error) {
          console.log('error');
        } finally {
          setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
        }
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '로그아웃 하시겠습니까?',
        message: '',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '로그아웃',
        onClickRightButton: onClickLogout
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
    } catch (error) {
      console.log('Logout Error', error);
    }
  };

  if (!authContext) {
    return <div>사용자 정보가 없습니다.</div>;
  }

  return (
    <ToggleContainer>
      <ToggleBox>
        <span>{authCurrentUser?.email}</span>
        <ProfileImageContainer>
          <img src={authCurrentUser?.photoURL ?? defaultImg} alt="profile" />
        </ProfileImageContainer>
        <span>{`안녕하세요, ${authCurrentUser?.displayName}님`}</span>
        <ButtonContainer>
          <AuthButton onClick={onNavigateMyPageHandler} $bgcolor="#FFD864" $bdrcolor="transparent">
            마이페이지
          </AuthButton>
          <AuthButton onClick={onLogOutHandler} $bgcolor="#f6f6f6" $bdrcolor={`${theme.color.gray}`}>
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
  @media screen and (max-width: 376px) {
    top: 58px;
    right: 0px;
  }
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

  @media screen and (max-width: 376px) {
    width: 270px;
    height: 270px;
  }
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
    /* object-fit: contain; */
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

interface AuthButtonProps {
  $bgcolor: string;
  $bdrcolor: string;
}

const AuthButton = styled.button<AuthButtonProps>`
  text-align: center;
  padding: 10px 5px;
  width: 120px;
  border-radius: 10px;
  background-color: ${(props) => props.$bgcolor};
  border: 1px solid ${(props) => props.$bdrcolor};
  cursor: pointer;

  @media screen and (max-width: 376px) {
    width: 100px;
  }
`;
