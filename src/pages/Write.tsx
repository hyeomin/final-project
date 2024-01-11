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
  return (
    <Container>
      <Header>
        <h3>글쓰기</h3>
        <SubmitButton newPost={newPost} />
      </Header>
      <Editor />
      <ImageUpload />
      <Hashtag />
    </Container>
  );
}

export default Write;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
  height: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  background-color: pink;
`;
