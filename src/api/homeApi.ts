//게시물 추가
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from '@firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { QUERY_KEYS } from '../query/keys';
import { auth, db, storage } from '../shared/firebase';

type Ref = {
  folder: string;
  imageName: string;
};

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
    // console.log('인기 유저게시물 리스트===>', posts);
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
      // console.log('No files found in the directory');
      return '';
    }
  } catch (error) {
    console.error('Error getting files: ', error);
    return null;
  }
};

// // 좋아요 상태 변경
const updateLikedUsers = async (post: PostType) => {
  const currentUserId = auth.currentUser?.uid;
  try {
    //post.id와 현재 로그인 유저정보 존재여부 확인
    if (post.id && currentUserId) {
      const postRef = doc(db, QUERY_KEYS.POSTS, post.id);
      const postSnap = await getDoc(postRef);

      // post.id 값에 해당하는 post 존재여부 확인
      if (postSnap.exists()) {
        const postData = postSnap.data();
        let likedUsers: string[] = postData?.likedUsers;
        //해당 likedUser 배열에 currentUserId가 있는지 확인
        if (likedUsers.includes(currentUserId)) {
          likedUsers = likedUsers.filter((uid) => uid !== currentUserId);
          await updateDoc(postRef, {
            likedUsers: arrayRemove(currentUserId)
          });
        } else {
          // currentUserId가 likedUsers에 없으면 추가
          likedUsers = [...likedUsers, currentUserId];
          await updateDoc(postRef, {
            likedUsers: arrayUnion(currentUserId)
          });
        }
        // likedUsers 배열의 길이를 likeCount로 설정
        await updateDoc(postRef, {
          likeCount: likedUsers.length // 배열의 길이를 likeCount로 설정
        });
      } else {
        console.log('Error: post.id가 없습니다.');
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

export { downloadImageURL, getAdminHomeContents, getPosts, getTopRankingPosts, updateLikedUsers };
