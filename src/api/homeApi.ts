//게시물 추가
import { collection, getDocs, limit, orderBy, query, where } from '@firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { QUERY_KEYS } from '../query/keys';
import { db, storage } from '../shared/firebase';

// 전체 게시물 가져오기
const getPosts = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.POSTS), orderBy('createdAt', 'desc'));
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
    const q = query(
      collection(db, QUERY_KEYS.POSTS),
      where('role', '==', 'admin'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
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
    const q = query(
      collection(db, QUERY_KEYS.POSTS),
      where('role', '==', 'user'),
      orderBy('likeCount', 'desc'),
      limit(8)
    );
    const querySnapshot = await getDocs(q);
    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    console.log('인기 유저게시물 리스트===>', posts)
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//이미지 가져오기
const downloadImageURL = async (postId: string) => {
  try {
    const listRef = ref(storage, `posts/${postId}`);
    const res = await listAll(listRef);

    if (res.items.length > 0) {
      const firstFileRef = res.items[0];
      const url = await getDownloadURL(firstFileRef);
      return url;
    } else {
      console.log('No files found in the directory');
      return '';
    }
  } catch (error) {
    console.error('Error getting files: ', error);
    return '';
  }
};

export { downloadImageURL, getAdminHomeContents, getPosts, getTopRankingPosts };
function setUrl(url: string) {
  throw new Error('Function not implemented.');
}
