import { collection, query, where, getDocs, DocumentData, getDoc, doc } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';
import { db } from '../shared/firebase';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';

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
      posts.push({ id: doc.id, ...doc.data() });
      //   console.log('posts', ' => ', doc.data());
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
      posts.push({ id: doc.id, ...doc.data() });
      console.log('likedPosts', ' => ', doc.data());
    });
    return posts;
  } catch (error) {
    console.error('에러입니다');
  }
};

// const getCurrentUser = async () => {
//   try {
//     const auth = getAuth();
//     const user = auth.currentUser?.uid;
//     if (user) {
//       const docRef = doc(db, 'users', user);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         console.log('Document data:', docSnap.data());
//       } else {
//         // docSnap.data() will be undefined in this case
//         console.log('No such document!');
//       }
//     }

// const q = query(collection(db, QUERY_KEYS.USERS), where('uid', '==', auth.currentUser?.uid));
// const querySnapshot = await getDocs(q);
// const currnetUser: PostType[] = [];

// querySnapshot.forEach((doc) => {
//   posts.push({ id: doc.id, ...doc.data() });
//   console.log('likedPosts', ' => ', doc.data());
// });
// return posts;
//   } catch (error) {
//     console.error('에러입니다');
//   }
// };

export { getMyPosts, getLikePosts };
