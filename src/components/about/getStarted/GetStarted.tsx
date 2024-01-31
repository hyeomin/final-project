import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import popular from '../../../assets/about/popular.webp';
import viewAll from '../../../assets/about/viewall.webp';
import write from '../../../assets/about/write.webp';
import { useModal } from '../../../hooks/useModal';
import { modalState } from '../../../recoil/modals';
import { auth } from '../../../shared/firebase';
import St from './style';

function GetStarted() {
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);
  const navigate = useNavigate();

  const onAuthCheckHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!auth.currentUser) {
      const onClickCancel = () => {
        modal.close();
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
        return;
      };

      const onClickSave = () => {
        modal.close();
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
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
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
    } else if (window.location.pathname === '/write') {
      window.location.reload();
    } else {
      navigate('/write');
      window.scrollTo(0, 0);
    }
  };
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const handleLinkClickMiddle = () => {
    const middlePosition = Math.ceil(window.innerHeight / 2);

    // Use scrollTo to scroll to the middle of the page
    window.scrollTo({
      top: middlePosition,
      behavior: 'smooth'
    });
  };

  return (
    <St.GetStartedContainer>
      <St.TabTitleContainer>
        <St.TabTitle>
          <h3>GET STARTED</h3>
        </St.TabTitle>
      </St.TabTitleContainer>
      <St.ColoredBox>
        <h5>친환경 라이프스타일의 시작! </h5>
        <p>작은 것부터 함께해보아요</p>
        <St.LinkContainer>
          <St.LinktoPage>
            <Link to="/write" onClick={onAuthCheckHandler}>
              <St.ImageContainer>
                <img src={write} alt="write" />
                <St.Gradient></St.Gradient>
                <h5>글쓰러 가기</h5>
              </St.ImageContainer>
            </Link>
          </St.LinktoPage>
          <St.LinktoPage>
            <Link to="/viewAll" onClick={handleLinkClick}>
              <St.ImageContainer>
                <img src={viewAll} alt="viewAll" />
                <St.Gradient></St.Gradient>
                <h5>게시글 읽으러 가기</h5>
              </St.ImageContainer>
            </Link>
          </St.LinktoPage>
          <St.LinktoPage>
            <Link to="/home" onClick={handleLinkClickMiddle}>
              <St.ImageContainer>
                <img src={popular} alt="popular" />
                <St.Gradient></St.Gradient>
                <h5>인기게시물 확인하기</h5>
              </St.ImageContainer>
            </Link>
          </St.LinktoPage>
        </St.LinkContainer>
      </St.ColoredBox>
    </St.GetStartedContainer>
  );
}

export default GetStarted;
