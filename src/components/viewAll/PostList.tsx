import St from './style';
import { QueryFunctionContext, QueryKey, useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { downloadImageURL } from '../../api/homeApi';
import defaultCover from '../../assets/defaultCoverImg.jpeg';
import { getFormattedDate_yymmdd } from '../../util/formattedDateAndTime';
import { SortList } from './ViewAllBody';

interface PostListProps {
  queryKey: QueryKey;
  queryFn: (
    context: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>
  ) => Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>;
  sortBy: SortList;
}

function PostList({ queryKey, queryFn, sortBy }: PostListProps) {
  const { data: posts, fetchNextPage } = useInfiniteQuery({
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
        <St.Contents>
          {posts?.map((post, idx) => {
            const imageQuery = imageQueries[idx];
            return (
              <St.Content key={post.id}>
                {imageQuery.isLoading ? (
                  <p>Loading image...</p>
                ) : (
                  <img src={imageQuery.data || defaultCover} alt={post.title} />
                )}
                <St.commentAndLikes>
                  <p>💬5</p>
                  <p>♥{post.likeCount}</p>
                </St.commentAndLikes>

                <St.TitleAndContent>
                  <p>{post.title}</p>
                  <div dangerouslySetInnerHTML={{ __html: removeImageTags(post?.content || '') }} />
                </St.TitleAndContent>
                <St.NeedDelete>
                  <p>삭제예정/ {post.category}</p>
                  <p>삭제예정/ {post.role}</p>
                </St.NeedDelete>

                <St.Row>
                  <h3>{getFormattedDate_yymmdd(post.createdAt!)}</h3>
                </St.Row>
              </St.Content>
            );
          })}
        </St.Contents>
      </St.ContentsWrapper>
      <St.MoreContentWrapper>
        <button onClick={() => fetchNextPage()}>더보기 &gt;</button>
      </St.MoreContentWrapper>
    </St.MainSubWrapper>
  );
}

export default PostList;
