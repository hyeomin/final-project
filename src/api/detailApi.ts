//게시물 추가
import { collection } from '@firebase/firestore';
import { db } from '../shared/firebase';
import { getDocs, query, where, orderBy, limit } from '@firebase/firestore';
import { QUERY_KEYS } from '../query/keys';


// role이 'admin'인 users 가져오기
const getAdmins = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.USERS), where('role', '==', 'admin'));
    const querySnapshot = await getDocs(q);

    const adminUserIds: User[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      adminUserIds.push(userData.uid);
    });
    console.log('관리자 list====>', adminUserIds);

    return adminUserIds;
  } catch (error) {
    console.log(error);
    return [];
  }
};
// admin 작성 게시물 가져오기
const getAdminPosts = async () => {
  const adminIds = await getAdmins();
  const postsRef = collection(db, QUERY_KEYS.POSTS);
  
  const promises = adminIds.map((adminId) => {
    const q = query(postsRef, where('uid', '==', adminId), orderBy('createdAt', 'desc'), limit(5));
    return getDocs(q);
  });

  const adminPosts: PostType[] = [];
  for await (const querySnapshot of promises) {
    querySnapshot.forEach((doc) => {
      adminPosts.push(doc.data());
    });
  }
  console.log('관리자 게시물====>', adminPosts);
  return adminPosts;
};

// role이 'user'인 users 가져오기
const getUsers = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.USERS), where('role', '==', 'user'));
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
const getUserPosts = async () => {
  const userIds = await getUsers();
  
  const postsRef = collection(db, QUERY_KEYS.POSTS);
  const promises = userIds.map((userId) => {
    const q = query(postsRef, where('uid', '==', userId), orderBy('likeCount', 'desc'), limit(8));
    return getDocs(q);
  });
  console.log('promises', promises)

  const userPosts: PostType[] = [];
  // filteredUserPosts.forEach((post) => {
  //   userPosts.push(post);
  // });
  for await (const querySnapshot of promises) {
      querySnapshot.forEach(doc => {
        userPosts.push(doc.data());
      });
  }
  console.log('user 게시물====>', userPosts);
  return userPosts;
};

export { getAdminPosts, getUserPosts};
