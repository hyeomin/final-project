import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  max-width: 1200px;
  margin: 0 30px;
  padding: 30px 0;
`;

const DetailEmptyFooter = styled.div`
  height: 280px;

  //모바일 세로
  @media screen and (max-width: 431px) {
    height: 40px;
  }
`;

export default { Container, DetailEmptyFooter };
