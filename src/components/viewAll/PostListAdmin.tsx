import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import mangoCover from '../../assets/tentative-cover-image.jpg';
import { PostType } from '../../types/PostType';
import Loader from '../common/Loader';
import { SortList } from './ViewAllBody';
import St from './style';
import { useNavigate } from 'react-router-dom';

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

  // useEffect(() => {}, [posts]);

  // 이미지URL 불러오기
  // const imageQueries = useQueries({
  //   queries:
  //     posts?.map((post) => ({
  //       queryKey: ['imageURL', post.id],
  //       queryFn: () => downloadImageURL(post.id as string)
  //     })) || []
  // });

  //
  const removeImageTags = (htmlContent: string) => {
    return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  };

  //내용 문자열 일정수 이상, 그 이상 문자열 ... 출력
  //에디터 라이브러리 html에서 가져오는 거여서 기본적으로 <p></p><p>가 있음 => 10글자
  //사용하고 싶은 길이 +10 글자 해야함
  const reduceContent = (postContent: string, cnt: number) => {
    return postContent?.length > cnt ? postContent.slice(0, cnt - 1) + '...' : postContent;
  };

  return (
    <St.MainSubWrapper>
      <St.ContentsWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <St.AdminContents>
            {posts?.map((post, idx) => {
              // const imageQuery = imageQueries[idx];
              return (
                <St.AdminContent key={post.id}>
                  <img src={mangoCover} alt={post.title} onClick={() => navigate(`/detail/${post.id}`)} />
                  {/* {imageQuery.isLoading ? (
                    // <p>Loading image...</p>
                    <Loader />
                  ) : (
                    <Link to={`/detail/${post.id}`}>
                      <img src={imageQuery.data || defaultCover} alt={post.title} />
                    </Link>
                  )} */}

                  <St.AdminPostTitle>{post.title}</St.AdminPostTitle>

                  {/* <St.AdminPostContent dangerouslySetInnerHTML={{ __html: removeImageTags(post?.content || '') }} /> */}
                  <div dangerouslySetInnerHTML={{ __html: reduceContent(removeImageTags(post?.content || ''), 41) }} />
                </St.AdminContent>
              );
            })}
          </St.AdminContents>
        )}
      </St.ContentsWrapper>

      <St.MoreContentWrapper>
        {isFetchingNextPage ? (
          <Loader />
        ) : hasNextPage ? (
          <button onClick={() => fetchNextPage()}>더 보기</button>
        ) : (
          <p>모든 데이터를 가져왔습니다.</p>
        )}
      </St.MoreContentWrapper>
    </St.MainSubWrapper>
  );
}

export default PostListAdmin;
