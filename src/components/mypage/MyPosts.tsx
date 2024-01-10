import React from 'react';
import St from './style';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { downloadImageURL, getAdminHomeContents, getTopRankingPosts } from '../../api/homeApi';

import { getMyPosts } from '../../api/myPostAPI';
import { QUERY_KEYS } from '../../query/keys';
import { auth } from '../../shared/firebase';

// 내 게시물 가져오기
const MyPosts = () => {
  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getMyPosts
  });
  console.log('myPost ===>', posts);

  const postQueries = useQueries({
    queries: [
      {
        queryKey: ['adminContents'],
        queryFn: getAdminHomeContents
      },
      {
        queryKey: [QUERY_KEYS.USERPOSTS],
        queryFn: getTopRankingPosts
      }
    ]
  });

  //필터된 posts 목록 (망고관리자 게시물은 임시로 둔다.)
  // const createdByMango = postQueries[0].data || [];
  const userPosts = postQueries[1].data || [];

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      userPosts?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  // console.log('ddd', imageQueries);
  // console.log('eee', userPosts);

  return (
    <div>
      MyPosts
      <St.MyPostsWrapper>
        {/* <St.MyPosts> */}
        {/* <St.MyPostImg></St.MyPostImg> */}
        <St.MyPostTextBox>
          {posts &&
            posts?.map((post) => {
              if (post.uid === auth.currentUser?.uid) {
                return (
                  <St.PostText>
                    {/* 제목이랑 content 순서 바껴야 함 */}
                    <St.MyPostImg dangerouslySetInnerHTML={{ __html: post?.content as string }} />
                    <div>{post.title}</div>

                    {/* <div>{post.content}</div>; */}
                  </St.PostText>
                );
              }
            })}
        </St.MyPostTextBox>
        {/* </St.MyPosts> */}
      </St.MyPostsWrapper>
    </div>
  );
};

export default MyPosts;
