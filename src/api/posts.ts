//게시물 추가
import { collection } from '@firebase/firestore';
import { db } from '../shared/firebase';
// import { QUERY_KEYS } from '../query/keys';
import { addDoc, getDocs, query, where, orderBy, limit } from '@firebase/firestore';

// //created by Mango posts 가져오기
const getAdminPosts = async () => {
  try {
    const q = query(collection(db, 'test'), where('role', '==', 'admin'), orderBy('createdAt', 'desc'), limit(5));
    const querySnapshot = await getDocs(q);

    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// //created by Mango posts 가져오기
const getTopRankingPosts = async () => {
  try {
    const q = query(collection(db, 'test'), where('role', '==', 'user'), orderBy('likeCount', 'desc'), limit(8));
    const querySnapshot = await getDocs(q);

    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 데이터 추가
const addPost = async (newPost: Post) => {
  try {
    const collectionRef = collection(db, 'test');
    await addDoc(collectionRef, newPost);
    console.log('저장완료');
  } catch (error) {
    console.log('error', error);
  }
};

export { addPost, getAdminPosts, getTopRankingPosts };
