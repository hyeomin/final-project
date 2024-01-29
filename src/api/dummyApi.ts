import { doc, getDoc } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';
import { db } from '../shared/firebase';
import { PostType } from '../types/PostType';

// 전체 게시물 가져오기
// export const getPostsDummy = async () => {
//   //console.log(auth.currentUser);
//   try {
//     const q = query(collection(db, QUERY_KEYS.POSTS), orderBy('createdAt', 'desc'));
//     const querySnapshot = await getDocs(q);

//     const posts: PostType[] = [];
//     querySnapshot.forEach((doc) => {
//       const postData = doc.data() as Omit<PostType, 'id'>;
//       const isLiked = auth.currentUser ? postData.likedUsers.includes(auth.currentUser.uid) : false;
//       posts.push({ id: doc.id, ...postData, isLiked: isLiked });
//       //   posts.push({ id: doc.id, ...postData });
//     });
//     return posts;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export const getDetailPost = async (postId: string) => {
  try {
    const postRef = doc(db, QUERY_KEYS.POSTS, postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      return undefined;
    }

    const post = postSnap.data() as PostType;
    return post;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
