import { QueryFunctionContext, QueryKey, useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/authApi';
import { downloadImageURL } from '../../api/homeApi';
import defaultImage from '../../assets/defaultCoverImg.jpeg';
import defaultProfile from '../../assets/defaultImg.jpg';
import { QUERY_KEYS } from '../../query/keys';
import { getFormattedDate_yymmdd } from '../../util/formattedDateAndTime';
import Loader from '../common/Loader';
import PostContentPreview from '../common/PostContentPreview';
import { SortList } from './ViewAllBody';
import St from './style';
import { useLikeButton } from '../../hooks/useLikeButton';
import { auth } from '../../shared/firebase';

interface PostListProps {
  queryKey: QueryKey;
  queryFn: (
    context: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>
  ) => Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>;
  sortBy: SortList;
}

function PostList({ queryKey, queryFn, sortBy }: PostListProps) {
  const navigate = useNavigate();
  // HM text 발라내기 위해 추가

  //좋아요
  const currentUser = auth.currentUser?.uid;
  const onClickLikeButton = useLikeButton();

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

  useEffect(() => {
    console.log('useEffect');
  }, [posts]);

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

  const fetchMore = () => {
    if (!hasNextPage) {
      alert('다음 게시물이 없습니다');
    }
    fetchNextPage();
  };

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
                    <Loader />
                  ) : (
                    <St.ContentImg
                      src={imageQuery.data || defaultImage}
                      alt={post.title}
                      onClick={() => navigate(`/detail/${post.id}`)}
                    />
                  )}

                  <St.PostInfoContainer>
                    {userList && userList?.find((user) => user.uid === post.uid) && (
                      <St.UserProfile>
                        <div>
                          <St.ProfileImg
                            src={userList.find((user) => user.uid === post.uid)?.profileImg || defaultProfile}
                            alt="profile"
                          />
                          <St.Row>
                            <p>{userList.find((user) => user.uid === post.uid)?.displayName}</p>
                            <span>{getFormattedDate_yymmdd(post.createdAt!)}</span>
                          </St.Row>
                        </div>
                        {/* 하트 클릭하는 버튼 */}
                        <St.HeartClickButton>
                          <St.LikeButton type="button" onClick={(e) => onClickLikeButton(e, post.id)} />
                          {post.likedUsers?.includes(currentUser!) ? <St.HeartFillIcon /> : <St.HeartIcon />}
                        </St.HeartClickButton>
                      </St.UserProfile>
                    )}
                    <St.TitleAndContent>
                      <p>{post.title}</p>
                      {post.content && <PostContentPreview postContent={post.content} />}
                    </St.TitleAndContent>
                    <St.CommentAndLikes>
                      <span>
                        <GoEye />
                        {post.viewCount ?? 0}
                      </span>
                      <span>
                        <GoHeart />
                        {post.likeCount ?? 0}
                      </span>
                      <span>
                        <GoComment />
                        {post.commentCount ?? 0}
                      </span>
                    </St.CommentAndLikes>
                  </St.PostInfoContainer>
                </St.Content>
              );
            })}
          </St.Contents>
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

export default PostList;
