import defaultImg from 'assets/defaultImg.jpg';
import { AuthContext } from 'context/AuthContext';
import { signOut } from 'firebase/auth';
import { useModal } from 'hooks/useModal';
import { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'recoil/modals';
import { roleState } from 'recoil/users';
import { auth } from 'shared/firebase';
import theme from 'types/styles/theme';

import St from './style';

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
    <St.ToggleContainer>
      <St.ToggleBox>
        <span>{authCurrentUser?.email}</span>
        <St.ProfileImageContainer>
          <img src={authCurrentUser?.photoURL ?? defaultImg} alt="profile" />
        </St.ProfileImageContainer>
        <span>{`안녕하세요, ${authCurrentUser?.displayName}님`}</span>
        <St.ButtonContainer>
          <St.AuthButton onClick={onNavigateMyPageHandler} $bgcolor="#FFD864" $bdrcolor="transparent">
            마이페이지
          </St.AuthButton>
          <St.AuthButton onClick={onLogOutHandler} $bgcolor="#f6f6f6" $bdrcolor={`${theme.color.gray}`}>
            로그아웃
          </St.AuthButton>
        </St.ButtonContainer>
      </St.ToggleBox>
    </St.ToggleContainer>
  );
}

export default AuthToggle;
