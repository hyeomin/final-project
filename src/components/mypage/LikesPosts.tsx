import { useQueries, useQuery } from '@tanstack/react-query';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/authApi';
import { downloadImageURL, getAdminContents, getUserContents } from '../../api/homeApi';
import { getLikePosts } from '../../api/myPostAPI';
import defaultCover from '../../assets/defaultCoverImg.jpeg';
import defaultProfile from '../../assets/defaultImg.jpg';
import { QUERY_KEYS } from '../../query/keys';
import { auth } from '../../shared/firebase';
import { getFormattedDate_yymmdd } from '../../util/formattedDateAndTime';
import PostContentPreview from '../common/PostContentPreview';
import Cs from '../viewAll/style';
import St from './style';
const LikesPosts = () => {
  // 게시물 이동을 위해 Ashley 추가
  const navigate = useNavigate();

  //포스트 작가 정보 가져오기 위해 Ashley 추가
  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

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
      {/* <St.PostsBox>
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
      </St.PostsBox> */}
      <Cs.Contents>
        {likePosts?.map((post, idx) => {
          const imageQuery = imageQueries[idx];
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
            </Cs.Content>
          );
        })}
      </Cs.Contents>
    </St.PostsWrapper>
  );
};

export default LikesPosts;
