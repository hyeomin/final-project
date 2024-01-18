import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getAllUsers } from '../api/authApi';
import Editor from '../components/write/Editor';
import Hashtag from '../components/write/Hashtag';
import ImageUpload from '../components/write/ImageUpload';
import Header from '../components/write/WriteHeader';
import { QUERY_KEYS } from '../query/keys';
import { foundPostState, isEditingPostState, postState } from '../recoil/posts';
import { roleState } from '../recoil/users';
import { auth } from '../shared/firebase';

export type isEditingPostProps = {
  foundPost: PostType | undefined;
  isEditingPost: boolean;
};

function Write() {
  const [post, setPost] = useRecoilState(postState);
  const [isEditingPost, setIsEditingPost] = useRecoilState(isEditingPostState);
  const [foundPost, setFoundPost] = useRecoilState<PostType | undefined>(foundPostState);
  const [role, setRole] = useRecoilState(roleState);

  const { state } = useLocation();

  // isEditingPost인지 확인하고 state 변경
  useEffect(() => {
    if (state) {
      setFoundPost(state.foundPost);
      setIsEditingPost(true);
    }
  }, [state]);

  // role이 비어있는 경우 다시 넣기
  const { data: userList, refetch } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers,
    enabled: role === ''
  });

  useEffect(() => {
    if (role === '') {
      refetch();
    }
    const user = userList && userList.find((user) => user.uid === auth.currentUser?.uid);
    if (user) {
      setRole(user.role);
    }
  }, [role, refetch, setRole, userList]);

  // 뒤로가기 버튼 누르면 내용 사라지게
  useEffect(() => {
    window.onbeforeunload = () => {
      return '내용이 사라집니다. 진행하시겠습니까?';
    };

    return () => {
      window.onbeforeunload = null;
      setPost({
        title: '',
        content: '',
        category: 'noCategory',
        hashtags: []
      });
    };
  }, []);

  return (
    <Container>
      <Header />
      <Editor foundPost={foundPost} isEditingPost={isEditingPost} />
      <Spacer />
      <Hashtag foundPost={foundPost} isEditingPost={isEditingPost} />
      <ImageUpload foundPost={foundPost} isEditingPost={isEditingPost} />
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
