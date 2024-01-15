import React from 'react';
import St from './style';
import { useInfiniteQuery, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { downloadImageURL, getAdminHomeContents, getTopRankingPosts } from '../../api/homeApi';
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  startAfter,
  QueryDocumentSnapshot,
  limit
} from 'firebase/firestore';
import { db } from '../../shared/firebase';
import { getMyPosts } from '../../api/myPostAPI';
import { QUERY_KEYS } from '../../query/keys';
import { auth } from '../../shared/firebase';
import { Link } from 'react-router-dom';
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
  const myPosts = postQueries[1].data || [];

  // console.log('imageQueries', imageQueries);
  // console.log('이거!!!!!!!posts', myPosts);

  function removeImageTags(htmlContent: string) {
    return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  }

  //useInfiniteQuery 더보기 구현
  // const {
  //   data: posts,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,

  //   isFetching,
  //   isFetchingNextPage,
  //   status
  // } = useInfiniteQuery({
  //   queryKey: [QUERY_KEYS.POSTS],
  //   queryFn: async ({ pageParam }) => {
  //     const q = pageParam
  //       ? query(collection(db, 'posts'), where('uid', '==', auth.currentUser?.uid), startAfter(pageParam), limit(2))
  //       : query(collection(db, 'posts'), where('uid', '==', auth.currentUser?.uid), limit(2));
  //     console.log('posts', posts);
  //     const querySnapshot = await getDocs(q);
  //     return querySnapshot.docs;
  //   },
  //   initialPageParam: undefined,
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage) {
  //       return undefined;
  //     }
  //   }
  // });

  // const {
  //   data: posts,
  //   fetchNextPage,
  //   hasNextPage,
  //   isLoading,
  //   isError
  // } = useInfiniteQuery({
  //   queryKey: [QUERY_KEYS.POSTS],
  //   queryFn: async ({ pageParam }) => {
  //     const q = pageParam
  //       ? query(collection(db, 'posts'), where('uid', '==', auth.currentUser?.uid), startAfter(pageParam), limit(2))
  //       : query(collection(db, 'posts'), where('uid', '==', auth.currentUser?.uid), limit(2));
  //     console.log(q);
  //     const querySnapshot = await getDocs(q);

  //     return querySnapshot.docs;
  //   },

  //   initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage.length === 0) {
  //       return undefined;
  //     }
  //     return lastPage[lastPage.length - 1];
  //   },
  //   select: (data) => {
  //     return data.pages.flat().map((doc) => ({ id: doc.id, ...doc.data() } as PostType));
  //   }
  // });

  // // console.log('Loading:', isLoading, 'Error:', isError, 'Data:', posts);

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      posts?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  // const fetchMore = () => {
  //   if (!hasNextPage) return;
  //   fetchNextPage();
  // };

  return (
    <St.PostsWrapper>
      <St.PostsBox>
        {posts?.map((item, idx) => {
          const imageQuery = imageQueries[idx];
          if (item.uid === auth.currentUser?.uid) {
            return (
              <Link to={`/detail/${item.id}`}>
                <St.TextBox key={item.id}>
                  <St.PostImg src={imageQuery.data!} />
                  <St.PostTitle>{item.title}</St.PostTitle>
                  <St.Contents dangerouslySetInnerHTML={{ __html: removeImageTags(item?.content || '') }} />
                </St.TextBox>
              </Link>
            );
          }
        })}
      </St.PostsBox>
      <button style={{ width: '100px', height: '50px;' }}>more</button>
    </St.PostsWrapper>
  );
};
export default MyPosts;
