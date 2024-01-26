import { GoChevronDown } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import defaultImg from '../../assets/defaultImg.jpg';
import { useModal } from '../../hooks/useModal';
import { isSignUpState } from '../../recoil/users';
import { auth } from '../../shared/firebase';
import St from './style';

type Props = {
  styledNav: ({ isActive }: { isActive: boolean }) => {
    color: string;
  };
  setIsAuthToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthNavBar({ styledNav, setIsAuthToggleOpen }: Props) {
  const modal = useModal();
  const setIsSignUp = useSetRecoilState(isSignUpState);

  const currentUser = auth.currentUser;

  const navigate = useNavigate();

  const onAuthCheckHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!auth.currentUser) {
      const onClickCancel = () => {
        modal.close();
        return;
      };

      const onClickSave = () => {
        modal.close();
        navigate('/auth');
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '로그인이 필요합니다.',
        message: '로그인 창으로 이동하시겠습니까?',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '로그인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    } else if (window.location.pathname === '/write') {
      window.location.reload();
    } else {
      navigate('/write');
    }
  };

  return (
    <St.AuthContainer>
      <St.StyledNavLnk to="/write" onClick={onAuthCheckHandler} style={styledNav}>
        글쓰기
      </St.StyledNavLnk>
      {currentUser ? (
        <>
          <St.UserInfo onClick={() => setIsAuthToggleOpen((prev) => !prev)}>
            <img src={currentUser?.photoURL ?? defaultImg} alt="profile" />
            <span>{currentUser?.displayName}</span>
            <span>
              <GoChevronDown />
            </span>
          </St.UserInfo>
        </>
      ) : (
        <>
          <St.StyledNavLnk to="/auth" onClick={() => setIsSignUp(false)} style={styledNav}>
            로그인
          </St.StyledNavLnk>
          <St.StyledNavLnk to="/auth" onClick={() => setIsSignUp(true)} style={styledNav}>
            회원가입
          </St.StyledNavLnk>
        </>
      )}
    </St.AuthContainer>
  );
}

export default AuthNavBar;
