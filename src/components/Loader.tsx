import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

export default function Loader() {
  return <Container>{<ClipLoader color="#FFA114" size={80} />}</Container>;
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`;
