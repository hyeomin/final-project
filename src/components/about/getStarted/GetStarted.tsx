import popular from '../../../assets/about/popular.webp';
import viewAll from '../../../assets/about/viewall.webp';
import write from '../../../assets/about/write.webp';
import St from './style';

function GetStarted() {
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
            <img src={write} alt="write" />
            <h5>글쓰러 가기</h5>
          </St.LinktoPage>
          <St.LinktoPage>
            <img src={popular} alt="popular" />
            <h5>게시글 읽으러 가기</h5>
          </St.LinktoPage>
          <St.LinktoPage>
            <img src={viewAll} alt="viewAll" />
            <h5>인기게시물 확인하기</h5>
          </St.LinktoPage>
        </St.LinkContainer>
      </St.ColoredBox>
    </St.GetStartedContainer>
  );
}

export default GetStarted;
