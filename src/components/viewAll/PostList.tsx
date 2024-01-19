import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot, arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GoComment, GoEye, GoHeart, GoHeartFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/authApi';
import defaultProfile from '../../assets/defaultImg.jpg';
import mangoCover from '../../assets/tentative-cover-image.jpg';
import { useLikeButton } from '../../hooks/useLikeButton';
import { QUERY_KEYS } from '../../query/keys';
import { PostType } from '../../types/PostType';
import { getFormattedDate, getFormattedDate_yymmdd } from '../../util/formattedDateAndTime';
import Loader from '../common/Loader';
import PostContentPreview from '../common/PostContentPreview';
import { SortList } from './ViewAllBody';
import St from './style';
import { auth, db } from '../../shared/firebase';
import { useRecoilValue } from 'recoil';
import { categoryListState } from '../../recoil/posts';
import { useEffect } from 'react';
import { useModal } from '../../hooks/useModal';

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

function PostList({ queryKey, queryFn, sortBy }: PostListProps) {
  const category = useRecoilValue(categoryListState);
  const navigate = useNavigate();
  // HM text 발라내기 위해 추가

  //좋아요
  const currentUserId = auth.currentUser?.uid;
  const queryClient = useQueryClient();
  const modal = useModal();

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
      let sortedPosts = data.pages.flat().map((doc) => {
        const postData = doc.data() as { likedUsers: string[] | undefined }; // 'likedUsers' 속성이 포함된 형식으로 타입 캐스팅
        return {
          isLiked: postData.likedUsers?.includes(auth.currentUser?.uid || ''),
          id: doc.id,
          ...postData
        } as PostType;
      });
      // let sortedPosts = data.pages.flat().map((doc) => (
      //   {isLiked: doc.likedUsers.includes(auth.currentUser!.uid) ,id: doc.id, ...doc.data() } as PostType));
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

  //좋아요
  const { mutateAsync: toggleLike } = useMutation({
    mutationFn: async (params: PostCardProps) => {
      const { postId, postData } = params;
      const postRef = doc(db, 'posts', postId);

      if (postData.isLiked !== undefined && currentUserId !== undefined) {
        await updateDoc(postRef, {
          likedUsers: postData.isLiked ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
        });
      } else {
        return;
      }
    },
    onMutate: async (params: PostCardProps) => {
      const { postId: selectedPostId } = params;

      queryClient.setQueriesData<InfiniteData<PostType[]> | undefined>({ queryKey: [category] }, (prevPosts) => {
        if (!prevPosts) {
          return {
            pages: [],
            pageParams: []
          };
        }
        if (!prevPosts) {
          return { pages: [], pageParams: [] };
        }

        // pages 배열 내의 모든 페이지를 펼칩니다.
        const updatedPages = prevPosts.pages.map((posts) =>
          posts.map((post) =>
            post.id === selectedPostId
              ? { ...post, isLiked: !post.isLiked, likeCount: post.isLiked ? post.likeCount! - 1 : post.likeCount! + 1 }
              : post
          )
        );

        // 업데이트된 pages 배열로 새로운 data 객체를 반환합니다.
        return { ...prevPosts, pages: updatedPages };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [category] });
    }
  });

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

  //invalidate,, 시간 정해놓고 (쿼리에 기능.. 탑100,,staleTime...)
  //새로고침시에만 새로운데이터 확인되도록.

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
                <St.Content key={post.id}>
                  <St.ContentImg src={mangoCover} alt={post.title} onClick={() => navigate(`/detail/${post.id}`)} />
                  {/* {imageQuery.isLoading ? (
                    <Loader />
                  ) : (
                    <St.ContentImg
                      src={imageQuery.data || defaultImage}
                      alt={post.title}
                      onClick={() => navigate(`/detail/${post.id}`)}
                    />
                  )} */}

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
                    {/* <St.NeedDelete>
                      <p>삭제/ {post.category}</p>
                      <p>삭제/ {getFormattedDate_yymmdd(post.createdAt!)}</p>
                    </St.NeedDelete> */}
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
