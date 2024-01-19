import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';
import { db } from '../shared/firebase';

// 로그인한 유저 uid 일치하는 posts 가져오기
const getMyPosts = async () => {
  try {
    const auth = getAuth();
    console.log('dd', auth.currentUser);
    const q = query(collection(db, QUERY_KEYS.POSTS), where('uid', '==', auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const posts: PostType[] = [];
    // 객체들을 forEach 사용해서 배열에 담기
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({ id: doc.id, ...data, isLiked: data.likedUsers.includes(auth.currentUser!.uid) });
    });
    return posts;
  } catch (error) {
    console.error(error, '에러입니다');
  }
};

//likeUsers에 로그인한 유저 uid가 있는 게시물 가져오기
const getLikePosts = async () => {
  try {
    const auth = getAuth();
    const q = query(collection(db, QUERY_KEYS.POSTS), where('likedUsers', 'array-contains', auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const posts: PostType[] = [];
    // 객체들을 forEach 사용해서 배열에 담기
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data(), isLiked: true });
    });
    return posts;
  } catch (error) {
    console.error('에러입니다');
  }
};

export { getLikePosts, getMyPosts };
