import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';
import { auth, db } from '../shared/firebase';
import { PostType } from '../types/PostType';

// 전체 게시물 가져오기
export const getPostsDummy = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.POSTS), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      const postData = doc.data() as Omit<PostType, 'id'>;
      const isLiked = auth.currentUser ? postData.likedUsers.includes(auth.currentUser.uid) : false;
      posts.push({ id: doc.id, ...postData, isLiked: isLiked });
      //   posts.push({ id: doc.id, ...postData });
    });
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};
