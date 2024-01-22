import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Editor from '../components/write/editor/Editor';
import Hashtag from '../components/write/hashtag/Hashtag';
import Header from '../components/write/header/WriteHeader';
import ImageUpload from '../components/write/imageUpload/ImageUpload';
import { initialPostInputState, isEditingPostState, postInputState } from '../recoil/posts';

function Write() {
  const location = useLocation();
  const { foundDetailPost } = location.state || {};
  console.log('foundDetailPost', foundDetailPost);

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const setIsEditingPost = useSetRecoilState(isEditingPostState);

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
      setIsEditingPost({
        foundPost: foundDetailPost,
        isEditing: true
      });
    } else {
      setPostInput(initialPostInputState);
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
