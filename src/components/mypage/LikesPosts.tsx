import React from 'react';
import St from './style';
import { useQueries, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getLikePosts } from '../../api/myPostAPI';
import { auth } from '../../shared/firebase';
import { Link } from 'react-router-dom';

import { downloadImageURL, getAdminContents, getUserContents } from '../../api/homeApi';
const LikesPosts = () => {
  const { data: likePosts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getLikePosts
  });
  console.log('이거이거이거 ===>', likePosts);

  const postQueries = useQueries({
    queries: [
      {
        queryKey: ['adminContents'],
        queryFn: getAdminContents
      },
      {
        queryKey: [QUERY_KEYS.USERPOSTS],
        queryFn: getUserContents
      }
    ]
  });

  //필터된 posts 목록 (망고관리자 게시물은 임시로 둔다.)
  // const createdByMango = postQueries[0].data || [];
  const myPosts = postQueries[1].data || [];

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      likePosts?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  function removeImageTags(htmlContent: string) {
    return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  }

  return (
    <St.PostsWrapper>
      <St.PostsBox>
        {likePosts?.map((item, idx) => {
          const imageQuery = imageQueries[idx];
          return (
            <Link to={`/detail/${item.id}`}>
              <St.TextBox>
                <St.PostImg src={imageQuery.data!} />
                <St.PostTitle>{item.title}</St.PostTitle>
                <St.Contents dangerouslySetInnerHTML={{ __html: removeImageTags(item?.content || '') }} />
              </St.TextBox>
            </Link>
          );
        })}
      </St.PostsBox>
    </St.PostsWrapper>
  );
};

export default LikesPosts;
