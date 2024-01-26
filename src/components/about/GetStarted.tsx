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
        <div>친환경 라이프스타일의 시작! 작은 것부터 함께 시작해보아요</div>
      </ColoredBox>

      <LinkContainer>
        <LinktoPage>
          <img src={write} alt="write" />
        </LinktoPage>
        <LinktoPage>
          <img src={popular} alt="popular" />
        </LinktoPage>
        <LinktoPage>
          <img src={viewAll} alt="viewAll" />
        </LinktoPage>
      </LinkContainer>
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
  background-color: lightblue;
`;

const TabTitle = styled.div`
  width: 340px;

  height: 70px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${theme.color.mangoMain};

  & h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: ${theme.font.agroBold};
    font-size: 24px;
    padding: 10px;
  }
`;

const ColoredBox = styled.div`
  background-color: ${theme.color.mangoMain};
  width: 100%;
  height: 360px;
`;

const LinkContainer = styled.div`
  width: 100%;
`;

const LinktoPage = styled.div`
  width: 380px;
  height: 370px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
