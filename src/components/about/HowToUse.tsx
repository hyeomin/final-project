import styled from 'styled-components';

function HowToUse() {
  return (
    <Container>
      <div>
        <p>oo의시작 ! 작은 것부터 실천하자!</p>
        <p>사람들이 친환경 습관을 관리하고 자신의 친환경 습관과 노하우를 사람들과 공유할 수 있는 커뮤니티</p>
      </div>
      <p>이용 설명 요기</p>
      <div>이용안내 이미지 요기</div>
    </Container>
  );
}

export default HowToUse;

const Container = styled.div`
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
