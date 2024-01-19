import styled from 'styled-components';
import Hashtag from '../components/write/Hashtag';
import ImageUploadTest from '../components/write/ImageUploadTest';
import Header from '../components/write/WriteHeader';
import Editor from '../components/write/editor/Editor';

function Write() {
  // 뒤로가기 버튼 누르면 내용 사라지게
  // useEffect(() => {
  //   window.onbeforeunload = () => {
  //     return '내용이 사라집니다. 진행하시겠습니까?';
  //   };

  //   return () => {
  //     window.onbeforeunload = null;
  //     setPost({
  //       title: '',
  //       content: '',
  //       category: 'noCategory',
  //       hashtags: []
  //     });
  //   };
  // }, []);

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
