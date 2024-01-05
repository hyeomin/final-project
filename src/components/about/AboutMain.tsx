import styled from 'styled-components';

function AboutMain() {
  return (
    <AboutMainContainer>
      <NavBar>
        <button>이용안내</button>
        <button>뉴스룸</button>
        <button>지금 시작하기</button>
      </NavBar>
      <HowtoUse>
        <div>
          <p>oo의시작 ! 작은 것부터 실천하자!</p>
          <p>사람들이 친환경 습관을 관리하고 자신의 친환경 습관과 노하우를 사람들과 공유할 수 있는 커뮤니티</p>
        </div>
        <HowtoUseNavBar>
          <button>게시글 올리기</button>
          <button>다른 사람 게시글 확인</button>
          <button>캘린더로 습관 관리</button>
        </HowtoUseNavBar>
        <p>이용 설명 요기</p>
        <div>이용안내 이미지 요기</div>
      </HowtoUse>
      {/* <NewsRoom>뉴스룸</NewsRoom>
        <StartNow>지금 시작하기</StartNow> */}
    </AboutMainContainer>
  );
}

export default AboutMain;

const AboutMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  width: 800px;
  padding: 20px;

  background-color: pink;
`;

const NavBar = styled.div`
  display: flex;
  column-gap: 10px;

  background-color: lightblue;
`;

const HowtoUse = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  padding: 10px;
  background-color: lightblue;

  & p {
    padding: 10px;
    text-align: center;
    background-color: pink;
  }
`;

const HowtoUseNavBar = styled.div`
  display: flex;
  column-gap: 10px;

  & button {
    width: 150px;
  }
`;
const NewsRoom = styled.div`
  background-color: lightblue;
`;

const StartNow = styled.div`
  background-color: lightblue;
`;
