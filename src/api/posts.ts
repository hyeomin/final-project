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

    const adminUsers: User[] = [];
    querySnapshot.forEach((doc) => {
      // const userData: User = {
      //   id: doc.id, // 문서의 ID값 주기. 자동지정? 필요없나..? 
      //   ...doc.data() as User, // 문서의 나머지 데이터 as User?
      // };
      adminUsers.push(doc.data());
    });

    return adminUsers;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// role이 'user'인 users 데이터 가져오기
const getUsers = async () => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'user'));
    const querySnapshot = await getDocs(q);

    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    console.log('users====>', users)
    // setUsers(users)
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};


// const getAdminPosts= async () => {
//   const adminIds = await getAdmins();
//   const postsRef = collection(db, "posts");
//   const promises = adminIds.map(adminId => {
//       const q = query(postsRef, where("authorId", "==", adminId));
//       return getDocs(q);
//   });

//   const posts: Post[] = [];
//   for await (const querySnapshot of promises) {
//       querySnapshot.forEach(doc => {
//           posts.push(doc.data());
//       });
//   }
//   return posts;
// }

// //created by Mango posts 가져오기
const getAdminPosts = async () => {
  try {
    const q = query(collection(db, 'test'), where('role', '==', 'admin'), orderBy('createdAt', 'desc'), limit(5));
    const querySnapshot = await getDocs(q);

    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    console.log('망고관리자 데이터가 왔어요.', posts) 
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// //created by Mango posts 가져오기
const getTopRankingPosts = async () => {
  try {
    const q = query(collection(db, 'test'), where('role', '==', 'user'), orderBy('likeCount', 'desc'), limit(8));
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



export { getAdminPosts, getTopRankingPosts, getAdmins, getUsers };
