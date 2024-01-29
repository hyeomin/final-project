import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot, arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GoComment, GoEye, GoHeart, GoHeartFill } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getAllUsers } from '../../api/authApi';
import defaultProfile from '../../assets/defaultImg.jpg';
import mangoCover from '../../assets/tentative-cover-image.jpg';
import { useModal } from '../../hooks/useModal';
import { QUERY_KEYS } from '../../query/keys';
import { categoryListState } from '../../recoil/posts';
import { auth, db } from '../../shared/firebase';
import { PostType } from '../../types/PostType';
import { getFormattedDate_yymmdd } from '../../util/formattedDateAndTime';
import Loader from '../common/Loader';
import PostContentPreview from '../common/PostContentPreview';
import { SortList } from './ViewAllBody';
import St from './style';

interface PostListProps {
  queryKey: QueryKey;
  queryFn: (
    context: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>
  ) => Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>;
  sortBy: SortList;
}

interface PostCardProps {
  postId: string;
  postData: PostType;
}

interface PostCardProps {
  postId: string;
  postData: PostType;
}

function PostList({ queryKey, queryFn, sortBy }: PostListProps) {
  const category = useRecoilValue(categoryListState);
  const navigate = useNavigate();

  //좋아요
  const currentUserId = auth.currentUser?.uid;
  const queryClient = useQueryClient();
  const modal = useModal();

  //더보기
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
      if (lastPage.length === 0 || lastPage.length < 4) {
        return undefined;
      }
      return lastPage[lastPage.length - 1];
    },
    select: (data) => {
      let sortedPosts = data.pages.flat().map((doc) => {
        const postData = doc.data() as { likedUsers: string[] | undefined }; // 'likedUsers' 속성이 포함된 형식으로 타입 캐스팅
        return {
          isLiked: postData.likedUsers?.includes(auth.currentUser?.uid || ''),
          id: doc.id,
          ...postData
        } as PostType;
      });
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

  //좋아요 토글 + 좋아요 수
  const { mutateAsync: toggleLike } = useMutation({
    mutationFn: async (params: PostCardProps) => {
      const { postId, postData } = params;
      const postRef = doc(db, 'posts', postId);

      if (postData.isLiked !== undefined && currentUserId !== undefined) {
        let newLikeCount;
        if (postData.isLiked) {
          //이미 좋아요한 경우
          newLikeCount = postData.likeCount ? postData.likeCount - 1 : 0;
        } else {
          //좋아요 안 한 경우
          newLikeCount = postData.likeCount !== undefined ? postData.likeCount + 1 : 1;
        }

        await updateDoc(postRef, {
          likedUsers: postData.isLiked ? arrayRemove(currentUserId) : arrayUnion(currentUserId),
          likeCount: newLikeCount
        });
      } else {
        return;
      }
    },
    onMutate: async (params: PostCardProps) => {
      const { postId: selectedPostId } = params;

      await queryClient.cancelQueries({ queryKey: [category] });

      //이전 데이터 저장
      const previousPosts = queryClient.getQueriesData<InfiniteData<PostType[]> | undefined>({ queryKey: [category] });

      queryClient.setQueriesData<InfiniteData<PostType[]> | undefined>({ queryKey: [category] }, (prevPosts) => {
        if (!prevPosts) {
          return {
            pages: [],
            pageParams: []
          };
        }

        // pages 배열 내의 모든 페이지를 펼칩니다.
        const updatedPages = prevPosts.pages.map((posts) =>
          posts.map((post) => (post.id === selectedPostId ? { ...post, isLiked: !post.isLiked } : post))
        );

        // 업데이트된 pages 배열로 새로운 data 객체를 반환합니다.
        return { ...prevPosts, pages: updatedPages };
      });

      //context에 이전 데이터 저장
      return { previousPosts };
    },
    onError: (Error, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [category] });
    }
  });

  //좋아요 버튼 이벤트핸들러
  const handleClickLikeButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    post: PostType
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUserId) {
      const onClickCancel = () => {
        modal.close();
        return;
      };

      const onClickSave = () => {
        modal.close();
        navigate('/auth');
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '로그인이 필요합니다.',
        message: '로그인 창으로 이동하시겠습니까?',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '로그인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    }

    await toggleLike({ postId: id, postData: post });
  };

  //사용자 프로필 데이터
  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  return (
    <St.MainSubWrapper>
      <St.ContentsWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <St.Contents>
            {posts?.map((post, idx) => {
              // const imageQuery = imageQueries[idx];

              return (
                <Link key={post.id} to={`/detail/${post.id}`}>
                  <St.Content>
                    <St.ContentImg
                      src={post.coverImages && post.coverImages.length > 0 ? post.coverImages[0].url : mangoCover}
                      alt={post.title}
                    />
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
                          <St.HeartClickButton
                            onClick={(e) => handleClickLikeButton(e, post.id, post)}
                            $isLiked={!!post.isLiked}
                          >
                            {post.isLiked ? <GoHeartFill /> : <GoHeart />}
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
                </Link>
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
