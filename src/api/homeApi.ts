//게시물 추가
import { collection, getDocs, limit, orderBy, query, where } from '@firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { QUERY_KEYS } from '../query/keys';
import { db, storage } from '../shared/firebase';

// 전체 게시물 가져오기
const getPosts = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.POSTS));
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
// function setUrl(url: string) {
//   throw new Error('Function not implemented.');
// }

// role이 'admin'인 users 가져오기
// const getAdmins = async () => {
//   try {
//     const q = query(collection(db, QUERY_KEYS.USERS), where('role', '==', 'admin'));
//     const querySnapshot = await getDocs(q);

//     const adminUserIds: User[] = [];

//     querySnapshot.forEach((doc) => {
//       const userData = doc.data();
//       adminUserIds.push(userData.uid);
//     });
//     console.log('관리자 list====>', adminUserIds);

//     return adminUserIds;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };


// admin 작성 게시물 가져오기
// const getAdminPosts = async () => {
//   const adminIds = await getAdmins();
//   const postsRef = collection(db, QUERY_KEYS.POSTS);
  
//   const promises = adminIds.map((adminId) => {
//     const q = query(postsRef, where('uid', '==', adminId), orderBy('createdAt', 'desc'), limit(5));
//     return getDocs(q);
//   });

//   const adminPosts: PostType[] = [];
//   for await (const querySnapshot of promises) {
//     querySnapshot.forEach((doc) => {
//       adminPosts.push(doc.data());
//     });
//   }
//   console.log('관리자 게시물====>', adminPosts);
//   return adminPosts;
// };

// role이 'user'인 users 가져오기
// const getUsers = async () => {
//   try {
//     const q = query(collection(db, QUERY_KEYS.USERS), where('role', '==', 'user'));
//     const querySnapshot = await getDocs(q);

//     const userIds: User[] = [];
//     querySnapshot.forEach((doc) => {
//       const userData = doc.data();
//       userIds.push(userData.uid);
//     });
//     // setUsers(users)
//     return userIds;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };


//user 작성 게시물 가져오기 (좋아요수 기준)
// const getUserPosts = async () => {
//   const userIds = await getUsers();
  
//   const postsRef = collection(db, QUERY_KEYS.POSTS);
//   const promises = userIds.map((userId) => {
//     const q = query(postsRef, where('uid', '==', userId), orderBy('likeCount', 'desc'), limit(8));
//     return getDocs(q);
//   });
//   console.log('promises', promises)

//   const userPosts: PostType[] = [];
//   // filteredUserPosts.forEach((post) => {
//   //   userPosts.push(post);
//   // });
//   for await (const querySnapshot of promises) {
//       querySnapshot.forEach(doc => {
//         userPosts.push(doc.data());
//       });
//   }
//   console.log('user 게시물====>', userPosts);
//   return userPosts;
// };
