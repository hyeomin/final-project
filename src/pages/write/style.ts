import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 50px 0;
  width: 100%;
  max-width: 900px;

  @media screen and (max-width: 431px) {
    margin: 0 0 50px 0;
    font-size: 80%;
  }
`;

const Spacer = styled.div`
  height: 30px;
`;

export default { Container, Spacer };
