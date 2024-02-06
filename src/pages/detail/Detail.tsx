import { useQuery } from '@tanstack/react-query';
import { getDetailPost, updatePostViewCount } from 'api/detailApi';
import { QUERY_KEYS } from 'query/keys';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
=======
import theme from 'types/styles/theme';
>>>>>>> e15e3ecafa59f576dbbb203d8daceb7eabcc0b61
import { PostType } from 'types/PostType';

import AddCommentForm from './components/comment/addComment/AddComment';
import CommentList from './components/comment/commentList/CommentList';
import CommentSkeleton from './components/comment/commentList/commentSkeleton/CommentSkeleton';
import DetailBody from './components/detailBody/DetailBody';
import DetailBodySkeleton from './components/detailBody/skeleton/DetailBodySkeleton';
import DetailHeader from './components/detailHeader/DetailHeader';
import DetailHeaderSkeleton from './components/detailHeader/skeleton/DetailHeaderSkeleton';
import PostShift from './components/postShift/PostShift';

import St from './style';

function Detail() {
  const { id } = useParams();

  // 해당 데이터 가져오기
  const {
    data: foundDetailPost,
    isLoading,
    error
  } = useQuery<PostType>({
    queryKey: [QUERY_KEYS.POSTS, id],
    queryFn: () => getDetailPost(id!),
    enabled: !!id,
    staleTime: 60_000
  });

  if (error) {
    console.log('상세페이지 게시글 불러오기 실패', error.message);
  }

  console.log('detail');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //조회수 업데이트
  const [viewCount, setViewCount] = useState(foundDetailPost?.viewCount || 0);

  useEffect(() => {
    if (foundDetailPost && foundDetailPost.id && !sessionStorage.getItem(`viewed-${foundDetailPost.id}`)) {
      updatePostViewCount(foundDetailPost.id);
      sessionStorage.setItem(`viewed-${foundDetailPost.id}`, 'true');
      setViewCount((prevCount) => prevCount + 1);
    }
  }, [foundDetailPost]);

  return (
    <St.Container>
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
      <St.DetailEmptyFooter></St.DetailEmptyFooter>
    </St.Container>
  );
}

export default Detail;
