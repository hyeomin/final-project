import { Link, useNavigate } from 'react-router-dom';
import popular from '../../../assets/about/popular.webp';
import viewAll from '../../../assets/about/viewall.webp';
import write from '../../../assets/about/write.webp';
import St from './style';
import { useModal } from '../../../hooks/useModal';
import { auth } from '../../../shared/firebase';

function GetStarted() {
  const modal = useModal();
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
    <St.GetStartedContainer>
      <St.TabTitle>
        <h3>GET STARTED</h3>
      </St.TabTitle>
      <St.ColoredBox>
        <St.Subtitle>
          <h5>친환경 라이프스타일의 시작! </h5>
          <p>작은 것부터 함께 시작해보아요</p>
        </St.Subtitle>
        <p>친환경 습관과 노하우를 사람들과 공유할 수 있는 커뮤니티</p>
        <St.LinkContainer>
          <St.LinktoPage>
            <Link to="/write" onClick={onAuthCheckHandler}>
              <img src={write} alt="write" />
              <h5>글쓰러 가기</h5>
            </Link>
          </St.LinktoPage>
          <St.LinktoPage>
            <Link to="/viewAll">
              <img src={viewAll} alt="viewAll" />
              <h5>게시글 읽으러 가기</h5>
            </Link>
          </St.LinktoPage>
          <St.LinktoPage>
            <Link to="/home">
              <img src={popular} alt="popular" />
              <h5>인기게시물 확인하기</h5>
            </Link>
          </St.LinktoPage>
        </St.LinkContainer>
      </St.ColoredBox>
    </St.GetStartedContainer>
  );
}

export default GetStarted;
