import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import defaultProfile from 'assets/defaultImg.jpg';
import PostContentPreview from 'components/PostContentPreview';
import { AuthContext } from 'context/AuthContext';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { produce } from 'immer';
import React, { useContext, useEffect, useState } from 'react';
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
import { getThumbnailSource } from 'util/getThumbnailSource';
import { fetchUsers } from 'api/axios';

interface PostCardProps {
  post: PostType;
}

function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  const queryClient = useQueryClient();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    console.log('특정 유저 가져오기 실패(PostCard)', error);
  }

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
      queryClient.setQueriesData<PostType[]>({ queryKey: ['posts'] }, (prevPosts) => {
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
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await fetchUsers();
        if (fetchedUsers) {
          setUsers(fetchedUsers);
        }
        setIsLoading(false);
      } catch (error) {
        setError('users 데이터 fetch 실패!');
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  if (error) {
    console.log('users 데이터 가져오기 실패!', error);
  }

  const user = users.find((user) => user.uid === post.uid);

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
