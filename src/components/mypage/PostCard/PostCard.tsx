import { useMutation, useQueryClient } from '@tanstack/react-query';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { produce } from 'immer';
import React from 'react';
import Cs from './styled';
import { GoComment, GoEye, GoHeart, GoHeartFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import defaultCover from '../../../assets/defaultCoverImg.jpeg';
import defaultProfile from '../../../assets/defaultImg.jpg';
import { auth, db } from '../../../shared/firebase';
import { PostType } from '../../../types/PostType';
import { getFormattedDate_yymmdd } from '../../../util/formattedDateAndTime';
import PostContentPreview from '../../common/PostContentPreview';

interface PostCardProps {
  post: PostType;
}

function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const currentUserId = auth.currentUser!.uid;
  const queryClient = useQueryClient();

  const { mutateAsync: toggleLike } = useMutation({
    mutationFn: async (postId: string) => {
      const postRef = doc(db, 'posts', postId);

      await updateDoc(postRef, {
        likedUsers: post.isLiked ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
      });
    },
    onMutate: async (postId) => {
      queryClient.setQueriesData<PostType[]>({ queryKey: ['posts'] }, (prevPosts) => {
        if (!prevPosts) return [];

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

  const handleClickLikeButton: React.MouseEventHandler = async (e) => {
    e.stopPropagation();

    await toggleLike(post.id);
  };

  return (
    <Cs.Content onClick={() => navigate(`/detail/${post.id}`)}>
      <Cs.ContentImg src={defaultCover} />
      {/* <Cs.ContentImg src={imageQuery.data || defaultCover} /> */}
      <Cs.PostInfoContainer>
        <Cs.UserProfile>
          <div>
            <Cs.ProfileImg src={auth.currentUser?.photoURL || defaultProfile} alt="profile" />
            <Cs.Row>
              {/* <p>{userList?.find((user) => user.uid === post.uid)?.displayName}</p> */}
              <p>김혜민</p>
              <span>{getFormattedDate_yymmdd(post.createdAt!)}</span>
            </Cs.Row>
          </div>
          <Cs.HeartClickButton onClick={handleClickLikeButton} $isLiked={!!post.isLiked}>
            {post.isLiked ? <GoHeartFill /> : <GoHeart />}
          </Cs.HeartClickButton>
        </Cs.UserProfile>

        <Cs.TitleAndContent>
          <p>{post.title}</p>
          {post.content && <PostContentPreview postContent={post.content} />}
        </Cs.TitleAndContent>

        <Cs.CommentAndLikes>
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
        </Cs.CommentAndLikes>
      </Cs.PostInfoContainer>
    </Cs.Content>
  );
}

export default PostCard;
