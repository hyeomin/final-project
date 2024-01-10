import React from 'react';
import St from './style';
import { useInfiniteQuery, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { downloadImageURL, getAdminHomeContents, getTopRankingPosts } from '../../api/homeApi';

import { getMyPosts } from '../../api/myPostAPI';
import { QUERY_KEYS } from '../../query/keys';
import { auth } from '../../shared/firebase';
import { collection } from 'firebase/firestore';

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

  //useInfiniteQuery 더보기 구현

  // const {
  //   data: posts,
  //   fetchNextPage,
  //   hasNextPage,
  //   isLoading,
  //   isError,
  //   error
  // } = useInfiniteQuery({
  //   queryKey: [QUERY_KEYS.POSTS],
  //   queryFn: async ({ pageParam }) => {
  //     console.log('pageParam', pageParam);
  //     const ref = collection(db, 'posts')
  //   }
  // });

  return (
    <div>
      MyPosts
      <St.MyPostsWrapper>
        <St.MyPostTextBox>
          {posts &&
            posts?.map((post) => {
              if (post.uid === auth.currentUser?.uid) {
                return (
                  <St.PostText>
                    {/* 제목이랑 content 순서 바뀌어야 함 */}
                    <St.MyPostImg dangerouslySetInnerHTML={{ __html: post?.content as string }} />
                    <div>{post.title}</div>
                  </St.PostText>
                );
              }
            })}
        </St.MyPostTextBox>
        <button style={{ width: '100px', height: '50px;' }}>more</button>
      </St.MyPostsWrapper>
    </div>
  );
};

export default MyPosts;
