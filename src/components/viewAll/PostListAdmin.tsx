import St from './style';
import { QueryFunctionContext, QueryKey, useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { downloadImageURL } from '../../api/homeApi';
import defaultCover from '../../assets/defaultCoverImg.jpeg';
import { getFormattedDate, getFormattedDate_yymmdd } from '../../util/formattedDateAndTime';
import { SortList } from './ViewAllBody';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

interface PostListProps {
  queryKey: QueryKey;
  queryFn: (
    context: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>
  ) => Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>;
  sortBy: SortList;
}

function PostListAdmin({ queryKey, queryFn, sortBy }: PostListProps) {
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage
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

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      posts?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  //
  const removeImageTags = (htmlContent: string) => {
    return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  };

  return (
    <St.MainSubWrapper>
      <St.ContentsWrapper>
        <St.AdminContents>
          {posts?.map((post, idx) => {
            const imageQuery = imageQueries[idx];
            return (
              <St.AdminContent key={post.id}>
                {imageQuery.isLoading ? (
                  <p>Loading image...</p>
                ) : (
                  <Link to={`/detail/${post.id}`}>
                    <img src={imageQuery.data || defaultCover} alt={post.title} />
                  </Link>
                )}

                <St.AdminPostTitle>{post.title}</St.AdminPostTitle>
                <St.AdminPostSpace></St.AdminPostSpace>
                <St.AdminPostContent dangerouslySetInnerHTML={{ __html: removeImageTags(post?.content || '') }} />

                {/* <St.NeedDelete>
                  <p>삭제예정/ {post.category}</p>
                  <p>삭제예정/ {post.role}</p>
                  <p>삭제예정/ {getFormattedDate_yymmdd(post.createdAt!)}</p>
                </St.NeedDelete> */}
              </St.AdminContent>
            );
          })}
        </St.AdminContents>
      </St.ContentsWrapper>

      <St.MoreContentWrapper>
        {isFetchingNextPage ? <Loader /> : <button onClick={() => fetchNextPage()}>더 보기 </button>}
      </St.MoreContentWrapper>
    </St.MainSubWrapper>
  );
}

export default PostListAdmin;
