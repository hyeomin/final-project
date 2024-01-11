import styled from 'styled-components';

function WhyMango() {
  return (
    <WhyContainer>
      <h5>WHY MANGO?</h5>
      <p>망고의 미션은 이러합니다</p>
    </WhyContainer>
  );
}

export default WhyMango;

const WhyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;

  padding: 10px;
  background-color: pink;

  & h5 {
    font-size: 60px;
  }
`;
