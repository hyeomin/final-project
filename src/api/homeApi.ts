//게시물 추가
import { collection } from '@firebase/firestore';
import { db } from '../shared/firebase';
import { getDocs, query, where, orderBy, limit } from '@firebase/firestore';
import { QUERY_KEYS } from '../query/keys';

// 전체 게시물 가져오기
const getPosts = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.POSTS));
    const querySnapshot = await getDocs(q);

    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};


//created by Mango posts 가져오기
const getAdminHomeContents = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.POSTS), where('role', '==', 'admin'), orderBy('createdAt', 'desc'), limit(5));
    const querySnapshot = await getDocs(q);

    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    // console.log('망고관리자 데이터가 왔어요.', posts)
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// //created by Mango posts 가져오기
const getTopRankingPosts = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.POSTS), where('role', '==', 'user'), orderBy('likeCount', 'desc'), limit(8));
    const querySnapshot = await getDocs(q);

    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};



export { getPosts, getAdminHomeContents, getTopRankingPosts};
