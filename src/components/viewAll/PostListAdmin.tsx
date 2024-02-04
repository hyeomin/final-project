import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import mangoCover from '../../assets/tentative-cover-image.jpg';
import { PostType } from '../../types/PostType';
import Loader from '../common/Loader';
import PostContentPreview from '../common/PostContentPreview';
import { SortList } from './ViewAllBody';
import St from './style';
import ByMangoSkeleton from './byMangoSkeleton/ByMangoSkeleton';

interface PostListProps {
  queryKey: QueryKey;
  queryFn: (
    context: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>
  ) => Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>;
  sortBy: SortList;
}

function PostListAdmin({ queryKey, queryFn, sortBy }: PostListProps) {
  const navigate = useNavigate();

  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPage[lastPage.length - 1];
    },
    staleTime: 60_000,
    select: (data) => {
      let sortedPosts = data.pages.flat().map((doc) => ({ id: doc.id, ...doc.data() } as PostType));

      if (sortBy === 'popularity') {
        sortedPosts = sortedPosts.sort((a, b) => {
          const likeCountA = a.likeCount ?? 0; // 만약 likeCount가 없다면 0으로 처리
          const likeCountB = b.likeCount ?? 0; // 만약 likeCount가 없다면 0으로 처리

          return likeCountB - likeCountA;
        });
      } else if (sortBy === 'latest') {
        sortedPosts = sortedPosts.sort((a, b) => {
          const createdAtA = a.createdAt ?? 0; // 만약 createdAt이 없다면 0으로 처리
          const createdAtB = b.createdAt ?? 0; // 만약 createdAt이 없다면 0으로 처리

          return createdAtB - createdAtA;
        });
      }
      return sortedPosts;
    }
  });

  return (
    <St.MainSubWrapper>
      <St.ContentsWrapper>
        <St.AdminContents>
          {isLoading ? (
            <ByMangoSkeleton />
          ) : (
            posts?.map((post) => {
              return (
                <St.AdminContent key={post.id} onClick={() => navigate(`/detail/${post.id}`)}>
                  <img
                    src={post.coverImages && post.coverImages.length > 0 ? post.coverImages[0].url : mangoCover}
                    alt={post.title}
                  />
                  <St.AdminPostTitle>{post.title}</St.AdminPostTitle>
                  {post.content && <PostContentPreview postContent={post.content} />}
                </St.AdminContent>
              );
            })
          )}
        </St.AdminContents>
        {/* {isLoading ? (
          <Loader />
        ) : (
          <St.AdminContents>
            {posts?.map((post) => {
              return (
                <St.AdminContent key={post.id} onClick={() => navigate(`/detail/${post.id}`)}>
                  <img
                    src={post.coverImages && post.coverImages.length > 0 ? post.coverImages[0].url : mangoCover}
                    alt={post.title}
                  />
                  <St.AdminPostTitle>{post.title}</St.AdminPostTitle>
                  {post.content && <PostContentPreview postContent={post.content} />}
                </St.AdminContent>
              );
            })}
          </St.AdminContents>
        )} */}
      </St.ContentsWrapper>

      <St.MoreContentWrapper>
        {/* {isFetchingNextPage ? (
          <Loader />
        ) : hasNextPage && posts?.length === 2 ? (
          <button onClick={() => fetchNextPage()}>더 보기</button>
        ) : (
          <p>모든 데이터를 가져왔습니다.</p>
        )} */}

        {isFetchingNextPage ? (
          <Loader />
        ) : hasNextPage ? (
          <button onClick={() => fetchNextPage()}>더 보기</button>
        ) : undefined}
      </St.MoreContentWrapper>
    </St.MainSubWrapper>
  );
}

export default PostListAdmin;
