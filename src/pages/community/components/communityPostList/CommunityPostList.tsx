import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import mangoCover from 'assets/mangoDefaultCover.png';
import defaultUserProfile from 'assets/realMango.png';
import Loader from 'components/Loader';
import PostContentPreview from 'components/PostContentPreview';
import PostsSkeleton from 'components/mypage/postsSkeleton/PostsSkeleton';
import { DocumentData, QueryDocumentSnapshot, arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useModal } from 'hooks/useModal';
import { QUERY_KEYS } from 'query/keys';
import { useEffect, useState } from 'react';
import { GoComment, GoEye, GoHeart, GoHeartFill } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'recoil/modals';
import { auth, db } from 'shared/firebase';
import { SortList } from 'types/PostListType';
import { PostType } from 'types/PostType';
import { getFormattedDate_yymmdd } from 'util/formattedDateAndTime';
import { getThumbnailSource } from 'util/getThumbnailSource';
import St, {
  AuthorNameAndDate,
  CommentAndLikes,
  HeartClickButton,
  PostCardHeader,
  PostCardHeaderLeft,
  PostContainer,
  PostImg,
  PostInfoContainer,
  PostTitleAndContent,
  SinglePost
} from './style';
import { getAllUsers } from 'api/authApi';
// import { User } from 'firebase/auth';

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

function CommunityPostList({ queryKey, queryFn, sortBy }: PostListProps) {
  const category = queryKey[1];
  const navigate = useNavigate();
  const currentUserId = auth.currentUser?.uid;
  const queryClient = useQueryClient();
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);

  //더보기
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: moreDataIsLoading,
    hasNextPage,
    error: moreDataError
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

  if (moreDataError) {
    console.log('community 데이터 읽기 오류', moreDataError);
  }

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
        throw new Error('Invalid input for toggleLike');
      }
    },
    onMutate: async (params: PostCardProps) => {
      const { postId: selectedPostId } = params;

      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS, category] });

      //이전 데이터 저장
      const previousPosts = queryClient.getQueriesData<InfiniteData<PostType[]> | undefined>({
        queryKey: [QUERY_KEYS.POSTS, category]
      });

      queryClient.setQueryData<InfiniteData<PostType[]>>([QUERY_KEYS.POSTS, category], (oldData) => {
        // 이전 데이터를 수정하고 반환
        return {
          pages: oldData?.pages ?? [],
          pageParams: oldData?.pageParams ?? []
        };
      });
      return { previousPosts };
    },
    onError: (Error, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
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
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
        modal.close();
        return;
      };

      const onClickSave = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
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
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
    }

    await toggleLike({ postId: id, postData: post });
  };

  const {
    data: users,
    isLoading: userIsLoading,
    error: usersError
  } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers,
    staleTime: 60_000 * 5
  });

  if (usersError) {
    console.log('users 데이터 가져오기 실패!', usersError);
  }

  return (
    <St.PostListContainer>
      <div>
        {moreDataIsLoading && userIsLoading ? (
          <PostsSkeleton />
        ) : (
          <PostContainer>
            {posts?.map((post, idx) => {
              const user = users?.find((user) => user.uid === post.uid);
              return (
                <Link key={post.id} to={`/detail/${post.id}`}>
                  <SinglePost>
                    <PostImg
                      src={getThumbnailSource(post.coverImages)}
                      alt={post.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = mangoCover;
                      }}
                    />
                    <PostInfoContainer>
                      <PostCardHeader>
                        <PostCardHeaderLeft>
                          <img src={user?.profileImg || defaultUserProfile} alt="profile" />
                          <AuthorNameAndDate>
                            <span>{user?.displayName}</span>
                            <p>{getFormattedDate_yymmdd(post.createdAt!)}</p>
                          </AuthorNameAndDate>
                        </PostCardHeaderLeft>

                        {/* 하트 클릭하는 버튼 */}
                        <HeartClickButton
                          onClick={(e) => handleClickLikeButton(e, post.id, post)}
                          $isLiked={!!post.isLiked}
                        >
                          {post.isLiked ? <GoHeartFill /> : <GoHeart />}
                        </HeartClickButton>
                      </PostCardHeader>

                      <PostTitleAndContent>
                        <p>{post.title}</p>
                        {post.content && <PostContentPreview postContent={post.content} />}
                      </PostTitleAndContent>

                      <CommentAndLikes>
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
                      </CommentAndLikes>
                    </PostInfoContainer>
                  </SinglePost>
                </Link>
              );
            })}
          </PostContainer>
        )}
      </div>
      <St.MoreContentWrapper>
        {isFetchingNextPage ? (
          <Loader />
        ) : hasNextPage ? (
          <button onClick={() => fetchNextPage()}>더 보기</button>
        ) : null}
      </St.MoreContentWrapper>
    </St.PostListContainer>
  );
}

export default CommunityPostList;
