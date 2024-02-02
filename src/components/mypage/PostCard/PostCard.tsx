import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { produce } from 'immer';
import React, { useContext } from 'react';
import { GoComment, GoEye, GoHeart, GoHeartFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../api/authApi';
import defaultProfile from '../../../assets/defaultImg.jpg';
import mangoCover from '../../../assets/tentative-cover-image.jpg';
import { AuthContext } from '../../../context/AuthContext';
import { QUERY_KEYS } from '../../../query/keys';
import { db } from '../../../shared/firebase';
import { PostType } from '../../../types/PostType';
import { getFormattedDate_yymmdd } from '../../../util/formattedDateAndTime';
import PostContentPreview from '../../common/PostContentPreview';
import {
  AuthorProfileImg,
  CommentAndLikes,
  HeartClickButton,
  PostCardHeader,
  PostCardHeaderTextRow,
  PostImg,
  PostTitleAndContent,
  SinglePost
} from '../../community/communityPostList/style';
import Cs, { PostInfoContainer } from './styled';

interface PostCardProps {
  post: PostType;
}

function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  // const currentUserId = auth.currentUser!.uid;
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  const queryClient = useQueryClient();

  // const { data: userList } = useQuery({
  //   queryKey: [QUERY_KEYS.USERS],
  //   queryFn: getAllUsers
  // });

  const { data: user } = useQuery({
    queryKey: [QUERY_KEYS.USERS, post.uid],
    queryFn: () => getUser(post.uid),
    staleTime: 6000 * 10
  });

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
      // console.log('onMutate');
      queryClient.setQueriesData<PostType[]>({ queryKey: ['posts'] }, (prevPosts) => {
        if (!Array.isArray(prevPosts)) return [];
        // console.log('prevPosts', prevPosts);
        const nextPosts = produce(prevPosts, (draftPosts) => {
          //console.log('draftPosts', draftPosts);
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
    // console.log('post', post);
  };

  return (
    <SinglePost onClick={() => navigate(`/detail/${post.id}`)}>
      <PostImg
        src={post.coverImages && post.coverImages.length > 0 ? post.coverImages[0].url : mangoCover}
        alt="cover"
      />
      <PostInfoContainer>
        <Cs.UserProfile>
          <PostCardHeader>
            <div>
              <AuthorProfileImg src={user?.profileImg || defaultProfile} alt="profile" />
              <PostCardHeaderTextRow>
                <p>{user?.displayName}</p>
                <span>{getFormattedDate_yymmdd(post.createdAt!)}</span>
              </PostCardHeaderTextRow>
            </div>
          </PostCardHeader>
          <HeartClickButton onClick={handleClickLikeButton} $isLiked={!!post.isLiked}>
            {post.isLiked ? <GoHeartFill /> : <GoHeart />}
          </HeartClickButton>
        </Cs.UserProfile>

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
