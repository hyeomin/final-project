import 'react-quill/dist/quill.snow.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, contentState, hashtagState, titleState } from '../../recoil/posts';
import { roleState } from '../../recoil/users';
import { auth } from '../../shared/firebase';
import Editor from './Editor';
import Hashtag from './Hashtag';
import ImageUpload from './ImageUpload';
import SubmitButton from './SubmitButton';

function WriteBody() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);
  const [hashtags, setHashtags] = useRecoilState(hashtagState);
  const role = useRecoilValue(roleState);

  const newPost = {
    category,
    title,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    hashtags,
    uid: auth.currentUser!.uid,
    likeCount: 0,
    likedUsers: null,
    role
  };

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
