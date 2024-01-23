import styled from 'styled-components';
import imageOne from '../../assets/about/howtouse(1).png';
import imageTwo from '../../assets/about/howtouse(2).png';
import imageThree from '../../assets/about/howtouse(3).png';
import bubbleOne from '../../assets/about/howtouse-bubble(1).png';
import bubbleTwo from '../../assets/about/howtouse-bubble(2).png';
import bubbleThree from '../../assets/about/howtouse-bubble(3).png';

function HowToUse() {
  return (
    <Container>
      <UsageExplanation>
        <img src={imageOne} alt="about-image1" />

        <Bubble>
          <img src={bubbleOne} alt="about-bubble1" />
          <TextInBubble $left={false}>
            <h5>
              친환경 라이프스타일 습관을 <br />
              관리할 수 있어요.
            </h5>
            <p>
              매일매일 친환경 라이프스타일을 인증하는
              <br /> 기록을 올리고, 캘린더에 스티커를 모아보세요.
            </p>
          </TextInBubble>
        </Bubble>
      </UsageExplanation>
      <UsageExplanation>
        <Bubble>
          <img src={bubbleTwo} alt="about-bubble2" />
          <TextInBubble $left={true}>
            <h5>
              재미있고 즐거운 친환경!
              <br /> 라이프스타일을 공유해요
            </h5>
            <p>라이프스타일 노하우, 제품 추천, 제품 나눔 등 타인에게 도움이 될만한 내용을 공유할 수 있어요!</p>
          </TextInBubble>
        </Bubble>
        <img src={imageTwo} alt="about-image2" />
      </UsageExplanation>
      <UsageExplanation>
        <img src={imageThree} alt="about-image3" />
        <Bubble>
          <img src={bubbleThree} alt="about-bubble3" />
          <TextInBubble $left={false}>
            <h5>Original Contents by Mango</h5>
            <p>
              망고가 알려드리는 라이프스타일 팁과 정보들을 <br /> 확인하세요!
            </p>
          </TextInBubble>
        </Bubble>
      </UsageExplanation>
    </Container>
  );
}

export default HowToUse;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const UsageExplanation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 120px;
  padding: 20px 0;

  & img {
    width: 280px;
    object-fit: contain;
  }
`;

const Bubble = styled.div`
  width: 450px;
  position: relative;

  & img {
    width: 100%;
    object-fit: contain;
  }
`;

type StyleProps = {
  $left: boolean;
};

const TextInBubble = styled.div<StyleProps>`
  position: absolute;
  top: ${(props) => (props.$left ? '26%' : '12%')};
  left: ${(props) => (props.$left ? '21%' : '20%')};
  color: ${(props) => (props.$left ? 'white' : 'black')};
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 25px;

  h5 {
    font-weight: bold;
    font-size: 19px;
    line-height: 120%;
    width: 220px;
  }

  & p {
    font-size: 14px;
    width: 100%;
    line-height: 150%;
  }
`;

const HowtoUseNavBar = styled.div`
  display: flex;
  column-gap: 10px;

  & button {
    width: 150px;
  }
`;
