import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';
import { db } from '../shared/firebase';
import { PostType } from '../types/PostType';

const updatePostViewCount = async (postId: string) => {
  const postRef = doc(db, QUERY_KEYS.POSTS, postId);
  await updateDoc(postRef, {
    viewCount: increment(1)
  });
};

export const getDetailPost = async (postId: string) => {
  try {
    const postRef = doc(db, QUERY_KEYS.POSTS, postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      return undefined;
    }

    const postData = postSnap.data() as Omit<PostType, 'id'>;
    const post: PostType = { id: postSnap.id, ...postData };
    return post;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export { updatePostViewCount };
