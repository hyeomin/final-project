import styled from 'styled-components';
import theme from '../../styles/theme';
import whyMango from './../../assets/about-why-mango.png';

function WhyMango() {
  return (
    <>
      <WhyContainer>
        <Title>
          <h5>WHY MANGO?</h5>
          <p>⌄</p>
        </Title>
        <Mission>
          <img src={whyMango} alt="mango-intro" />
          <Textbox>
            <SubTitle>
              <p>아직까지 우리에게 낯선 </p>
              <p>환경을 아끼는 라이프스타일</p>
            </SubTitle>
            <Description>
              <span>망고는 망해가는 지구를 함께 고쳐나가자는 미션을 가지고 있습니다.</span>
              <p>지구 온난화, 환경 오염, 식량난 등 다양한 환경 문제가 대두되고 있는 지금,</p>
              <p>친환경 라이프스타일이 재미있고 즐거운 일상으로 자리 잡을 수 있도록 돕는 서비스입니다.</p>
            </Description>
          </Textbox>
        </Mission>
      </WhyContainer>
      <Fade></Fade>
    </>
  );
}

export default WhyMango;

const WhyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: ${theme.color.mangoMain};
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 80px;

  color: white;
  font-size: 60px;
  font-family: ${theme.font.mango};
  height: 400px;
`;

const Mission = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;

  & img {
    width: 320px;
  }
`;

const Textbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 50px;
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  color: white;
  font-size: 26px;
  font-family: ${theme.font.agroBold};
  opacity: 80%;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: #222222cc;
  font-family: ${theme.font.agroLight};
  font-size: 15px;

  & span {
    font-family: ${theme.font.agroBold};
  }
`;

const Fade = styled.div`
  width: 100vw;
  height: 300px;
  background: linear-gradient(to bottom, rgba(255, 161, 20, 1) 50%, rgba(255, 161, 20, 0) 100%);
`;
