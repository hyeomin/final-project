import styled from 'styled-components';
import popular from '../../assets/about/popular.jpg';
import viewAll from '../../assets/about/viewall.jpg';
import write from '../../assets/about/write.jpg';
import theme from '../../styles/theme';
function GetStarted() {
  return (
    <GetStartedContainer>
      <TabTitle>
        <h3>GET STARTED</h3>
      </TabTitle>
      <ColoredBox>
        <h5>친환경 라이프스타일의 시작! </h5>
        <p>작은 것부터 함께 시작해보아요</p>
        <LinkContainer>
          <LinktoPage>
            <img src={write} alt="write" />
            <h5>글쓰러 가기</h5>
          </LinktoPage>
          <LinktoPage>
            <img src={popular} alt="popular" />
            <h5>게시글 읽으러 가기</h5>
          </LinktoPage>
          <LinktoPage>
            <img src={viewAll} alt="viewAll" />
            <h5>인기게시물 확인하기</h5>
          </LinktoPage>
        </LinkContainer>
      </ColoredBox>
    </GetStartedContainer>
  );
}

export default GetStarted;

const GetStartedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 600px;
`;

const TabTitle = styled.div`
  width: 340px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${theme.color.mangoMain};

  & h3 {
    text-align: center;
    display: flex;
    justify-content: center;
    color: white;
    font-family: ${theme.font.agroBold};
    font-size: 24px;
    padding: 10px;
  }
`;

const ColoredBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: ${theme.color.mangoMain};
  width: 100%;
  height: 340px;
  padding: 60px 180px;
  color: white;
  position: relative;

  & h5 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  width: 100%;
  height: 370px;
  margin: 30px 0;
  border-radius: 10px;
`;

const LinktoPage = styled.div`
  background-color: ${theme.color.mangoMain};
  overflow: hidden;
  padding: 5px;
  border-radius: 10px;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  & h5 {
    position: absolute;
    bottom: 40px;
    left: 40px;
  }
`;
