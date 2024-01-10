import React from 'react';
import St from './style';
import { getMyPosts } from '../../api/myPostAPI';
import { QUERY_KEYS } from '../../query/keys';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../../shared/firebase';

const MyPosts = () => {
  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getMyPosts
  });
  console.log('myPost ===>', posts);

  return (
    <div>
      MyPosts
      <St.MyPostsWrapper>
        <St.MyPosts>
          {/* <St.MyPostImg></St.MyPostImg> */}
          <St.MyPostTextBox>
            {posts &&
              posts?.map((post) => {
                if (post.uid === auth.currentUser?.uid) {
                  return (
                    <St.PostText>
                      <div>{post.title}</div>
                      <div>{post.content}</div>;
                    </St.PostText>
                  );
                }
              })}
          </St.MyPostTextBox>
        </St.MyPosts>
      </St.MyPostsWrapper>
    </div>
  );
};

export default MyPosts;
