import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { useEffect } from 'react';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../src/shared/firebase';
import { getAllUsers } from '../../api/authApi';
import { downloadImageURL, getAdminContents, getUserContents } from '../../api/homeApi';
import { getMyPosts } from '../../api/myPostAPI';
import defaultCover from '../../assets/defaultCoverImg.jpeg';
import defaultProfile from '../../assets/defaultImg.jpg';
import { QUERY_KEYS } from '../../query/keys';
import { auth } from '../../shared/firebase';
import { getFormattedDate_yymmdd } from '../../util/formattedDateAndTime';
import PostContentPreview from '../common/PostContentPreview';
import Cs from '../viewAll/style';

// 내 게시물 가져오기
const MyPosts = () => {
  // 게시물 이동을 위해 Ashley 추가
  const navigate = useNavigate();

  //포스트 작가 정보 가져오기 위해 Ashley 추가
  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getMyPosts,
    enabled: !!auth.currentUser
  });
  console.log('myPost ===>', posts);

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
      posts?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  // console.log('imageQueries', imageQueries);
  // console.log('이거!!!!!!!posts', myPosts);

  function removeImageTags(htmlContent: string) {
    return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  }

  //useInfiniteQuery 더보기 구현

  useEffect(() => {
    console.log('어스');
  }, [auth.currentUser]);
  useEffect(() => {
    console.log('포스트');
  }, [posts]);
  useEffect(() => {
    console.log('이미지');
  }, [imageQueries]);

  const {
    data: admin,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.ADMIN],
    queryFn: async ({ pageParam }) => {
      const q = pageParam
        ? query(collection(db, 'posts'), where('uid', '==', auth.currentUser?.uid), startAfter(pageParam), limit(4))
        : query(collection(db, 'posts'), where('uid', '==', auth.currentUser?.uid), limit(4));

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs;
    },

    initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPage[lastPage.length - 1];
    },
    select: (data) => {
      return data.pages.flat().map((doc) => ({ id: doc.id, ...doc.data() } as PostType));
    }
  });

  console.log('Loading:', isLoading, 'Error:', isError, 'Data:', admin);

  const fetchMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      <Cs.Contents>
        {posts?.map((post, idx) => {
          const imageQuery = imageQueries[idx];
          if (post.uid === auth.currentUser?.uid) {
            return (
              <Cs.Content onClick={() => navigate(`/detail/${post.id}`)}>
                <Cs.ContentImg src={imageQuery.data || defaultCover} />
                <Cs.PostInfoContainer>
                  <Cs.UserProfile>
                    <div>
                      <Cs.ProfileImg src={auth.currentUser?.photoURL || defaultProfile} alt="profile" />
                      <Cs.Row>
                        <p>{userList?.find((user) => user.uid === post.uid)?.displayName}</p>
                        <span>{getFormattedDate_yymmdd(post.createdAt!)}</span>
                      </Cs.Row>
                    </div>
                    <Cs.HeartClickButton>
                      <GoHeart />
                    </Cs.HeartClickButton>
                  </Cs.UserProfile>
                  <Cs.TitleAndContent>
                    <p>{post.title}</p>
                    {post.content && <PostContentPreview postContent={post.content} />}
                    {/* <div
                      dangerouslySetInnerHTML={{ __html: reduceContent(removeImageTags(post?.content || ''), 41) }}
                    /> */}
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
                {/* <St.TextBox>
                  <div>{post.title}</div>
                  <St.Contents dangerouslySetInnerHTML={{ __html: removeImageTags(post?.content || '') }} />
                </St.TextBox> */}
              </Cs.Content>
            );
          }
        })}
      </Cs.Contents>
      <button onClick={fetchMore} style={{ width: '100px', height: '50px;' }}>
        more
      </button>
    </>
  );
};
export default MyPosts;
