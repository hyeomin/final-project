import imageOne from '../../../assets/about/howtouse(1).png';
import imageTwo from '../../../assets/about/howtouse(2).png';
import imageThree from '../../../assets/about/howtouse(3).png';
import bubbleOne from '../../../assets/about/howtouse-bubble(1).png';
import bubbleTwo from '../../../assets/about/howtouse-bubble(2).png';
import bubbleThree from '../../../assets/about/howtouse-bubble(3).png';
import St from './style';

function HowToUse() {
  return (
    <St.Container>
      <St.Title>
        <p>망고만의 건강한 생활습관을 만드는 우리의 원칙</p>
        <h3>WE MAKE</h3>
        <h3>ECO LIFESTYLE </h3>
      </St.Title>
      <St.UsageExplanation>
        <img src={imageOne} alt="about-image1" />

        <St.Bubble>
          <img src={bubbleOne} alt="about-bubble1" />
          <St.TextInBubble $left={false}>
            <h5>
              친환경 라이프스타일 습관을 <br />
              관리할 수 있어요.
            </h5>
            <p>
              매일매일 친환경 라이프스타일을 인증하는
              <br /> 기록을 올리고, 캘린더에 스티커를 모아보세요.
            </p>
          </St.TextInBubble>
        </St.Bubble>
      </St.UsageExplanation>
      <St.UsageExplanation>
        <St.Bubble>
          <img src={bubbleTwo} alt="about-bubble2" />
          <St.TextInBubble $left={true}>
            <h5>
              재미있고 즐거운 친환경!
              <br /> 라이프스타일을 공유해요
            </h5>
            <p>라이프스타일 노하우, 제품 추천, 제품 나눔 등 타인에게 도움이 될만한 내용을 공유할 수 있어요!</p>
          </St.TextInBubble>
        </St.Bubble>
        <img src={imageTwo} alt="about-image2" />
      </St.UsageExplanation>
      <St.UsageExplanation>
        <img src={imageThree} alt="about-image3" />
        <St.Bubble>
          <img src={bubbleThree} alt="about-bubble3" />
          <St.TextInBubble $left={false}>
            <h5>Original Contents by Mango</h5>
            <p>
              망고가 알려드리는 라이프스타일 팁과 정보들을 <br /> 확인하세요!
            </p>
          </St.TextInBubble>
        </St.Bubble>
      </St.UsageExplanation>
    </St.Container>
  );
}

export default HowToUse;
