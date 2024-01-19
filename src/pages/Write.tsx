import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Hashtag from '../components/write/Hashtag';
import ImageUploadTest from '../components/write/ImageUploadTest';
import Header from '../components/write/WriteHeader';
import Editor from '../components/write/editor/Editor';

function Write() {
  const location = useLocation();
  const { foundDetailPost } = location.state || {};
  console.log('foundDetailPost', foundDetailPost);

  return (
    <Container>
      <Header />
      <Editor />
      <Spacer />
      <Hashtag />
      <ImageUploadTest />
    </Container>
  );
}

export default Write;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 50px 0;
`;

const Spacer = styled.div`
  height: 30px;
`;
