//게시물 추가
import { collection } from '@firebase/firestore';
import { db } from '../shared/firebase';
// import { QUERY_KEYS } from '../query/keys';
import { getDocs, query, where, orderBy, limit } from '@firebase/firestore';


// role이 'admin'인 users 가져오기
const getAdmins = async () => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'admin'));
    const querySnapshot = await getDocs(q);

    const adminUserIds: User[] = [];
    querySnapshot.forEach((doc) => {
        const userData = doc.data();
      adminUserIds.push(userData.uid);
    });
        console.log('관리자 list====>', adminUserIds)

    return adminUserIds;
  } catch (error) {
    console.log(error);
    return [];
  }
};
// admin 작성 게시물 가져오기
const getAdminPosts= async () => {
  const adminIds = await getAdmins();
  const postsRef = collection(db, "posts");
  const promises = adminIds.map(adminId => {
      const q = query(postsRef, where("uid", "==", adminId), orderBy('createdAt', 'desc'), limit(5));
      return getDocs(q);
  });

  const adminPosts: PostType[] = [];
  for await (const querySnapshot of promises) {
      querySnapshot.forEach(doc => {
        adminPosts.push(doc.data());
      });
  }
  console.log('관리자 게시물====>', adminPosts)
  return adminPosts;
}

// role이 'user'인 users 가져오기
const getUsers = async () => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'user'));
    const querySnapshot = await getDocs(q);

    const userIds: User[] = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      userIds.push(userData.uid);
    });
    // setUsers(users)
    return userIds;
  } catch (error) {
    console.log(error);
    return [];
  }
};
//user 작성 게시물 가져오기 (좋아요수 기준)
const getUserPosts= async () => {
  const userIds = await getUsers();
  console.log('userIds', userIds)
  const postsRef = collection(db, "posts");
  const promises = userIds.map(userId => {
      const q = query(postsRef, where("uid", "==", userId), orderBy('likeCount', 'desc'), limit(8));
      return getDocs(q);
  });

  const userPosts: PostType[] = [];
  for await (const querySnapshot of promises) {
      querySnapshot.forEach(doc => {
        userPosts.push(doc.data());
      });
  }
  console.log('user 게시물====>', userPosts)
  return userPosts;
}



// //created by Mango posts 가져오기
// const getAdminPosts = async () => {
//   try {
//     const q = query(collection(db, 'test'), where('role', '==', 'admin'), orderBy('createdAt', 'desc'), limit(5));
//     const querySnapshot = await getDocs(q);

//     const posts: PostType[] = [];
//     querySnapshot.forEach((doc) => {
//       posts.push({ id: doc.id, ...doc.data() });
//     });
//     console.log('망고관리자 데이터가 왔어요.', posts) 
//     return posts;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// //created by Mango posts 가져오기
// const getTopRankingPosts = async () => {
//   try {
//     const q = query(collection(db, 'test'), where('role', '==', 'user'), orderBy('likeCount', 'desc'), limit(8));
//     const querySnapshot = await getDocs(q);

//     const posts: PostType[] = [];
//     querySnapshot.forEach((doc) => {
//       posts.push({ id: doc.id, ...doc.data() });
//     });

//     return posts;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };



export { getAdminPosts, getUserPosts};
