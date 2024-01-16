import St from './style';
import { QueryFunctionContext, QueryKey, useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { downloadImageURL } from '../../api/homeApi';
import defaultCover from '../../assets/defaultCoverImg.jpeg';
import { getFormattedDate_yymmdd } from '../../util/formattedDateAndTime';
import { SortList } from './ViewAllBody';
import { Link } from 'react-router-dom';
import { QUERY_KEYS } from '../../query/keys';
import { getAllUsers } from '../../api/authApi';
import defaultImg from '../../assets/defaultImg.jpg';
import { FaHeart } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import Loader from '../common/Loader';
import { useEffect } from 'react';
interface PostListProps {
  queryKey: QueryKey;
  queryFn: (
    context: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>
  ) => Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>;
  sortBy: SortList;
}

function PostList({ queryKey, queryFn, sortBy }: PostListProps) {
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    isLoading
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

  useEffect(() => {}, [posts]);

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

  //내용 문자열 일정수 이상, 그 이상 문자열 ... 출력
  //에디터 라이브러리 html에서 가져오는 거여서 기본적으로 <p></p><p>가 있음 => 10글자
  //사용하고 싶은 길이 +10 글자 해야함
  const reduceContent = (postContent: string, cnt: number) => {
    return postContent?.length > cnt ? postContent.slice(0, cnt - 1) + '...' : postContent;
  };

  //사용자 프로필 데이터
  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  console.log('사용자정보:', userList);

  return (
    <St.MainSubWrapper>
      <St.ContentsWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <St.Contents>
            {posts?.map((post, idx) => {
              const imageQuery = imageQueries[idx];
              return (
                <St.Content key={post.id}>
                  {imageQuery.isLoading ? (
                    // <p>Loading image...</p>
                    <Loader />
                  ) : (
                    <Link to={`/detail/${post.id}`}>
                      <St.ContentImg src={imageQuery.data || defaultCover} alt={post.title} />
                    </Link>
                  )}
                  <St.commentAndLikes>
                    <FaRegComment />
                    <p>{post.commentCount}</p>
                    <p>
                      <FaHeart size="15" />
                    </p>
                    <p>{post.likeCount}</p>
                  </St.commentAndLikes>

                  <St.UserProfile>
                    {userList && userList?.find((user) => user.uid === post.uid) && (
                      <>
                        <St.ProfileImg
                          src={userList.find((user) => user.uid === post.uid)?.profileImg || defaultImg}
                          alt="profile"
                        />

                        <div>{userList.find((user) => user.uid === post.uid)?.displayName}</div>
                      </>
                    )}
                  </St.UserProfile>

                  <St.TitleAndContent>
                    <p>{post.title}</p>
                    <div
                      dangerouslySetInnerHTML={{ __html: reduceContent(removeImageTags(post?.content || ''), 41) }}
                    />
                  </St.TitleAndContent>
                  {/* <St.NeedDelete>
                  <p>삭제예정/ {post.category}</p>
                  <p>삭제예정/ {post.role}</p>
                </St.NeedDelete> */}

                  <St.Row>
                    <h3>{getFormattedDate_yymmdd(post.createdAt!)}</h3>
                  </St.Row>
                </St.Content>
              );
            })}
          </St.Contents>
        )}
      </St.ContentsWrapper>
      <St.MoreContentWrapper>
        {isFetchingNextPage ? <Loader /> : <button onClick={() => fetchNextPage()}>더 보기</button>}
      </St.MoreContentWrapper>
    </St.MainSubWrapper>
  );
}

export default PostList;
