//게시물 추가
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
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

// default 이미지 가져오기
const downloadDefaultImage = async ({ folder, imageName }: Ref) => {
  const imageRef = ref(storage, `${folder}/${imageName}`);
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error('Error fetching image URL:', error);
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

export { getAdminHomeContents, getPosts, getTopRankingPosts, downloadImageURL, downloadDefaultImage, updateLikedUsers };

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
