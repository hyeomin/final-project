import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDetailPost, updatePostViewCount } from '../api/detailApi';
import Loader from '../components/common/Loader';
import AddCommentForm from '../components/detail/comment/addComment/AddComment';
import CommentList from '../components/detail/comment/commentList/CommentList';
import DetailBody from '../components/detail/detailBody/DetailBody';
import DetailHeader from '../components/detail/detailHeader/DetailHeader';
import PostShift from '../components/detail/postShift/PostShift';
import { QUERY_KEYS } from '../query/keys';
import theme from '../styles/theme';
import { PostType } from '../types/PostType';
import DetailHeaderSkeleton from '../components/detail/detailHeader/skeleton/DetailHeaderSkeleton';
import DetailBodySkeleton from '../components/detail/detailBody/skeleton/DetailBodySkeleton';
import CommentSkeleton from '../components/detail/comment/commentList/commentSkeleton/CommentSkeleton';

function Detail() {
  const { id } = useParams();

  // 해당 데이터 가져오기
  const { data: foundDetailPost, isLoading } = useQuery<PostType | undefined>({
    queryKey: [QUERY_KEYS.POSTS, id],
    queryFn: () => (id ? getDetailPost(id) : undefined),
    staleTime: 60_000
  });

  //조회수 업데이트
  const [viewCount, setViewCount] = useState(foundDetailPost?.viewCount || 0);

  useEffect(() => {
    if (foundDetailPost && foundDetailPost.id && !sessionStorage.getItem(`viewed-${foundDetailPost.id}`)) {
      updatePostViewCount(foundDetailPost.id);
      sessionStorage.setItem(`viewed-${foundDetailPost.id}`, 'true');
      setViewCount((prevCount) => prevCount + 1);
    }
  }, [foundDetailPost]);

  // if (isLoading) {
  //   return <Loader />;
  // }

  // 포스트 존재 여부 검사
  // if (posts) {
  // 해당 아이디를 가진 post가 존재하는지 확인
  // const validatePostId = posts.some((post) => post.id === id);
  // if (!id || !validatePostId) {
  //   ('존재하지 않는 게시물입니다.');
  //   navigate('/'); // 홈으로 이동
  //   return;
  // }

  return (
    <Container>
      {/* <DetailTitle>상세페이지</DetailTitle> */}
      {isLoading && (
        <>
          <DetailHeaderSkeleton />
          <DetailBodySkeleton />
          <AddCommentForm foundDetailPost={foundDetailPost!} />
          <CommentSkeleton />
          <PostShift postId={id} />
        </>
      )}
      {foundDetailPost && (
        <>
          <DetailHeader foundDetailPost={foundDetailPost} isLoading={isLoading} />
          <DetailBody foundDetailPost={foundDetailPost} isLoading={isLoading} />
          <AddCommentForm foundDetailPost={foundDetailPost} isLoading={isLoading} />
          <CommentList foundDetailPost={foundDetailPost} isLoading={isLoading} />
          <PostShift postId={id} />
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
  width: 100%;
  max-width: 1200px;
  //min-width: 600px;
  margin: 0 30px;
  padding: 30px 0;
`;

const DetailTitle = styled.h3`
  color: ${theme.color.gray};
  font-size: 18px;
  padding: 30px 0;
`;

const DetailEmptyFooter = styled.div`
  height: 280px;

  //모바일 세로
  @media screen and (max-width: 431px) {
    height: 40px;
  }
`;
