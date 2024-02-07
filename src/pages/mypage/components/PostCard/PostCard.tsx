import { useMutation, useQueryClient } from '@tanstack/react-query';
import defaultProfile from 'assets/defaultImg.jpg';
import PostContentPreview from 'components/PostContentPreview';
import { AuthContext } from 'context/AuthContext';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { produce } from 'immer';
import React, { useContext } from 'react';
import { GoComment, GoEye, GoHeart, GoHeartFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { db } from 'shared/firebase';
import { PostType } from 'types/PostType';
import { getFormattedDate_yymmdd } from 'util/formattedDateAndTime';
import {
  AuthorNameAndDate,
  CommentAndLikes,
  HeartClickButton,
  PostCardHeader,
  PostCardHeaderLeft,
  PostImg,
  PostInfoContainer,
  PostTitleAndContent,
  SinglePost
} from 'pages/community/components/communityPostList/style';
import { QUERY_KEYS } from 'query/keys';
import { getThumbnailSource } from 'util/getThumbnailSource';
import { getAllUsers } from 'api/authApi';

interface PostCardProps {
  post: PostType;
}

function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  const queryClient = useQueryClient();

  const { mutateAsync: toggleLike } = useMutation({
    mutationFn: async (postId: string) => {
      if (!postId) {
        console.log('postId:', postId);
        return;
      }

      const postRef = doc(db, 'posts', postId);

      if (authCurrentUser) {
        await updateDoc(postRef, {
          likedUsers: post.isLiked ? arrayRemove(authCurrentUser?.uid) : arrayUnion(authCurrentUser?.uid)
        });
      }

      const postSnap = await getDoc(postRef);

      if (postSnap && authCurrentUser) {
        const postData = postSnap.data();

        await updateDoc(postRef, {
          likeCount: postData?.likedUsers?.length
        });
      }
    },
    onMutate: async (postId) => {
      queryClient.setQueriesData<PostType[]>({ queryKey: [QUERY_KEYS.POSTS] }, (prevPosts) => {
        if (!Array.isArray(prevPosts)) return [];

        const nextPosts = produce(prevPosts, (draftPosts) => {
          const post = draftPosts.find((post) => post.id === postId);
          if (!post) return draftPosts;

          post.isLiked = !post.isLiked;

          return draftPosts;
        });

        return nextPosts;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    }
  });

  const { data: users, error: usersError } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers,
    staleTime: 60_000 * 5
  });

  if (usersError) {
    console.log('users 데이터 가져오기 실패!', usersError);
  }

  const user = users?.find((user) => user.uid === post.uid);

  const handleClickLikeButton: React.MouseEventHandler = async (e) => {
    e.stopPropagation();

    await toggleLike(post.id);
  };

  return (
    <SinglePost onClick={() => navigate(`/detail/${post.id}`)}>
      <PostImg src={getThumbnailSource(post.coverImages)} alt="cover" />
      <PostInfoContainer>
        <PostCardHeader>
          <PostCardHeaderLeft>
            <img src={user?.profileImg || defaultProfile} alt="profile" />
            <AuthorNameAndDate>
              <span>{user?.displayName}</span>
              <p>{getFormattedDate_yymmdd(post.createdAt!)}</p>
            </AuthorNameAndDate>
          </PostCardHeaderLeft>
          <HeartClickButton onClick={handleClickLikeButton} $isLiked={!!post.isLiked}>
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
            {post.viewCount}
          </span>
          <span>
            <GoHeart />
            {post.likeCount}
          </span>
          <span>
            <GoComment />
            {post.commentCount ?? 0}
          </span>
        </CommentAndLikes>
      </PostInfoContainer>
    </SinglePost>
  );
}

export default PostCard;
