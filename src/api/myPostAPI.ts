import { collection, getDocs, query, where } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';
import { auth, db } from '../shared/firebase';
import { PostType } from '../types/PostType';
import { UsersWithLikeCount, likeCountPerUserType } from './homeApi';
// import auth from '../../src/shared/'
// import { auth} from '../../shared/firebase';

// 로그인한 유저 uid 일치하는 posts 가져오기
const getMyPosts = async () => {
  try {
    // const auth = getAuth();
    // console.log('dd', auth.currentUser);
    const q = query(collection(db, QUERY_KEYS.POSTS), where('uid', '==', auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const posts: PostType[] = [];
    // 객체들을 forEach 사용해서 배열에 담기
    querySnapshot.forEach((doc) => {
      // type 수정 Ashley
      const postData = doc.data() as Omit<PostType, 'id'>;
      const isLiked = auth.currentUser ? postData.likedUsers.includes(auth.currentUser.uid) : false;
      posts.push({ id: doc.id, ...postData, isLiked: isLiked });
      // posts.push({ id: doc.id, ...postData, isLiked: postData.likedUsers.includes(auth.currentUser.uid) });
    });
    return posts;
  } catch (error) {
    // console.error(error, '에러입니다');
  }
};

//likeUsers에 로그인한 유저 uid가 있는 게시물 가져오기
const getLikePosts = async () => {
  try {
    // const auth = getAuth();
    const q = query(collection(db, QUERY_KEYS.POSTS), where('likedUsers', 'array-contains', auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const posts: PostType[] = [];
    // 객체들을 forEach 사용해서 배열에 담기
    querySnapshot.forEach((doc) => {
      // type 추가 Ashley
      const postData = doc.data() as Omit<PostType, 'id'>;
      posts.push({ id: doc.id, ...postData, isLiked: true });
    });
    return posts;
  } catch (error) {
    // console.error('에러입니다');
  }
};

//user Ranking
const getUserRanking = async () => {
  try {
    const postRef = collection(db, 'posts');
    const querySnapshot = await getDocs(postRef);

    const posts: UsersWithLikeCount[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data() as PostType;
      const post = {
        uid: docData.uid,
        likeCount: docData.likeCount,
        viewCount: docData.viewCount
      };
      posts.push(post);
    });

    // 좋아요 합계 계산
    const countPerUser = posts.reduce<Record<string, { totalLikes: number; totalViews: number }>>((acc, post) => {
      if (!acc[post.uid!]) {
        acc[post.uid!] = { totalLikes: 0, totalViews: 0 };
      }
      acc[post.uid!].totalLikes += post.likeCount!;
      acc[post.uid!].totalViews += post.viewCount!;
      return acc;
    }, {});

    // 객체를 배열로 변환
    const usersWithCounts = Object.entries(countPerUser).map(([uid, counts]) => ({
      uid,
      totalLikes: counts.totalLikes,
      totalViews: counts.totalViews
    }));

    //좋아요가 0인 유저 필터링
    const filteredUsers = usersWithCounts.filter((user) => user.totalLikes > 0);

    const topUsers: likeCountPerUserType[] = filteredUsers.sort((a, b) => {
      const sortedByLikes = b.totalLikes - a.totalLikes;
      if (sortedByLikes === 0) {
        return b.totalViews - a.totalViews;
      }
      return sortedByLikes;
    });
    return topUsers;
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export { getLikePosts, getMyPosts, getUserRanking };
