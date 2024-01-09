import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, contentState, titleState } from '../../recoil/posts';
import { auth } from '../../shared/firebase';
import Editor from './Editor';
import Hashtag from './Hashtag';
import ImageUpload from './ImageUpload';
import SubmitButton from './SubmitButton';

function WriteBody() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null) {
      window.alert('유저 정보가 없습니다.');
      navigate('/');
    }
  }, [navigate]);

  const newPost = {
    category,
    title,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    hashtag: null,
    uid: auth.currentUser!.uid,
    likeCount: 0,
    likedUsers: null,
    role: 'user'
  };

  if (auth.currentUser === null) {
    return <div></div>;
  }

  return (
    <Container>
      <Editor />
      <ImageUpload />
      <Hashtag />
      <SubmitButton newPost={newPost} />
    </Container>
  );
}

export default WriteBody;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
`;
