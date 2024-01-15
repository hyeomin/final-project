import styled from 'styled-components';

function TestPage() {
  return (
    <Container>
      <div>gg</div>
    </Container>
  );
}

export default TestPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & div {
    background-color: lightblue;
    width: 100vw;
  }
`;
