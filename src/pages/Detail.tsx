import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { updatePostViewCount } from '../api/detailApi';
import { getPosts } from '../api/homeApi';
import DetailBody from '../components/detail/DetailBody';
import DetailHeader from '../components/detail/DetailHeader';
import PostShift from '../components/detail/PostShift';
import AddCommentForm from '../components/detail/comment/AddComment';
import CommentList from '../components/detail/comment/CommentList';
import { QUERY_KEYS } from '../query/keys';

export type FoundPostProps = {
  foundPost: PostType;
};

function Detail() {
  const [foundPost, setFoundPost] = useState<PostType | undefined>();
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

  //조회수 업데이트
  const [viewCount, setViewCount] = useState(foundPost?.viewCount || 0);
  useEffect(() => {
    if (foundPost && !sessionStorage.getItem(`viewed-${foundPost.id}`)) {
      updatePostViewCount(foundPost.id);
      sessionStorage.setItem(`viewed-${foundPost.id}`, 'true');
      setViewCount((prevCount) => prevCount + 1);
    }
  }, [postList, foundPost]);

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
          {/* {foundPost.uid === auth.currentUser?.uid && <EditNDelete foundPost={foundPost} />} */}
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
  align-items: start;
`;

const DetailEmptyFooter = styled.div`
  height: 280px;
`;
