import mangoMission from './../../../../assets/about/about-why-mango.png';
import St from './style';

function MangoMission() {
  return (
    <St.WhyContainer>
      <St.Mission>
        <img src={mangoMission} alt="mango-intro" />
        <St.Textbox>
          <St.SubTitle>
            <p>아직까지 우리에게 낯선 </p>
            <p>환경을 아끼는 라이프스타일</p>
          </St.SubTitle>
          <St.Description>
            <p>망고는 망해가는 지구를 함께 고쳐나가자는 미션을 가지고 있습니다.</p>
            <p>지구 온난화, 환경 오염, 식량난 등 다양한 환경 문제가 대두되고 있는 지금,</p>
            <p>친환경 라이프스타일이 재미있고 즐거운 일상으로 자리 잡을 수 있도록 돕는 서비스입니다.</p>
          </St.Description>
        </St.Textbox>
      </St.Mission>
    </St.WhyContainer>
  );
}

export default MangoMission;
