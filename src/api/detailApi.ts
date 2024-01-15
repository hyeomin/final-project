import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { db, storage } from '../shared/firebase';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';

const downloadCoverImageURLs = async (postId: string) => {
  try {
    const listRef = ref(storage, `posts/${postId}`);
    const res = await listAll(listRef);

    if (res.items.length > 0) {
      const urls = await Promise.all(res.items.map((fileRef) => getDownloadURL(fileRef)));
      return urls;
    } else {
      console.log('No files found in the directory');
      return [];
    }
  } catch (error) {
    console.error('Error getting files: ', error);
    return null;
  }
};

const updatePostViewCount = async (postId: string) => {
  const postRef = doc(db, QUERY_KEYS.POSTS, postId);
  await updateDoc(postRef, {
    viewCount: increment(1)
  });
};

export { downloadCoverImageURLs, updatePostViewCount };
