import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../shared/firebase';


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

export { downloadCoverImageURLs };
