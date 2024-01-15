import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getPosts } from '../api/homeApi';
import DetailBody from '../components/detail/DetailBody';
import DetailHeader from '../components/detail/DetailHeader';
import EditNDelete from '../components/detail/EditNDelete';
import PostShift from '../components/detail/PostShift';
import AddCommentForm from '../components/detail/comment/AddComment';
import CommentList from '../components/detail/comment/CommentList';
import { QUERY_KEYS } from '../query/keys';
import { foundPostState } from '../recoil/posts';
import { auth } from '../shared/firebase';

function Detail() {
  //인덱스 넘버로 페이지 관리

  const [foundPost, setFoundPost] = useRecoilState<PostType | undefined>(foundPostState);
  const { id } = useParams();

  const { data: postList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  useEffect(() => {
    if (postList) {
      const foundPost = postList.find((post) => post.id === id);
      setFoundPost(foundPost);
    }
  }, [postList, id, setFoundPost]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      {foundPost && (
        <>
          <PostShift postList={postList} postId={id} />
          <DetailHeader foundPost={foundPost} />
          <DetailBody foundPost={foundPost} />
          <AddCommentForm foundPost={foundPost} />
          <CommentList foundPost={foundPost} />
          {foundPost.uid === auth.currentUser?.uid && <EditNDelete foundPost={foundPost} />}
        </>
      )}
      <DetailEmptyFooter></DetailEmptyFooter>
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailEmptyFooter = styled.div`
  height: 280px;
`;
