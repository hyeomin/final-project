import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Editor from '../components/write/Editor';
import Hashtag from '../components/write/Hashtag';
import ImageUpload from '../components/write/ImageUpload';
import SubmitButton from '../components/write/SubmitButton';
import { categoryState, contentState, hashtagState, titleState } from '../recoil/posts';
import { roleState } from '../recoil/users';
import { auth } from '../shared/firebase';

function Write() {
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

  // omit으로 타입 관리해야 함
  const editingPost = {
    category,
    title,
    content,
    updatedAt: Date.now(),
    hashtags
  };

  return (
    <Container>
      <Header>
        <SubmitButton newPost={newPost} />
      </Header>
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
`;

const Header = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  border-bottom: 1px solid black;
  height: 50px;
`;

const Spacer = styled.div`
  height: 30px;
`;
