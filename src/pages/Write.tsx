import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Hashtag from '../components/write/Hashtag';
import Header from '../components/write/WriteHeader';
import Editor from '../components/write/editor/Editor';
import ImageUpload from '../components/write/imageUpload/ImageUpload';
import { postInputState } from '../recoil/posts';

function Write() {
  const location = useLocation();
  const { foundDetailPost } = location.state || {};
  console.log('foundDetailPost', foundDetailPost);

  const [postInput, setPostInput] = useRecoilState(postInputState);

  console.log('postInput-->', postInput);

  useEffect(() => {
    if (foundDetailPost) {
      setPostInput({
        title: foundDetailPost.title,
        content: foundDetailPost.content,
        category: foundDetailPost.category,
        hashtags: foundDetailPost.hashtags,
        coverImages: foundDetailPost.coverImages
      });
    } else {
      setPostInput({
        title: '',
        content: '',
        category: '',
        hashtags: [],
        coverImages: []
      });
    }
    console.log('write page');
  }, []);

  return (
    <Container>
      <Header isEditing={!!foundDetailPost} />
      <Editor />
      <Spacer />
      <Hashtag />
      <ImageUpload />
    </Container>
  );
}

export default Write;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 50px 0;
  width: 900px;
`;

const Spacer = styled.div`
  height: 30px;
`;
