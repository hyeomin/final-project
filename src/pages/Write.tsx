import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Hashtag from '../components/write/Hashtag';
import ImageUploadTest from '../components/write/ImageUploadTest';
import Header from '../components/write/WriteHeader';
import Editor from '../components/write/editor/Editor';
import { isEditingPostState, postInputState } from '../recoil/posts';

function Write() {
  const location = useLocation();
  const { foundDetailPost } = location.state || {};
  console.log('foundDetailPost', foundDetailPost);

  const setPostInput = useSetRecoilState(postInputState);
  const isEditing = useRecoilValue(isEditingPostState);

  useEffect(() => {
    if (isEditing && foundDetailPost) {
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
  }, []);

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
  width: 900px;
`;

const Spacer = styled.div`
  height: 30px;
`;
