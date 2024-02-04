import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 50px;

  //모바일 세로
  @media screen and (max-width: 431px) {
    width: 100%;
  }
`;

export default { Container };
