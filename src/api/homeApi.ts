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
import { PostType } from '../types/PostType';

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
      const postData = doc.data() as Omit<PostType, 'id'>;
      posts.push({ id: doc.id, ...postData });
      // posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 관리자게시물
const getAdminContents = async () => {
  console.log('getAdminContents');
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
      const postData = doc.data() as Omit<PostType, 'id'>;
      posts.push({ id: doc.id, ...postData });
      // posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};
// 인기게시물
const getPopularContents = async () => {
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
      const postData = doc.data() as Omit<PostType, 'id'>;
      posts.push({ id: doc.id, ...postData });
      // posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 좋아요 상태 변경
const updateLikedUsers = async (id: string) => {
  const currentUserId = auth.currentUser?.uid;
  try {
    //post.id와 현재 로그인 유저정보 존재여부 확인
    if (id && currentUserId) {
      const postRef = doc(db, QUERY_KEYS.POSTS, id);
      const postSnap = await getDoc(postRef);

      // post.id 값에 해당하는 post 존재여부 확인
      if (postSnap.exists()) {
        const postData = postSnap.data();
        let likedUsers: string[] = postData?.likedUsers || [];

        if (likedUsers.includes(currentUserId)) {
          likedUsers = likedUsers.filter((uid) => uid !== currentUserId);
          await updateDoc(postRef, {
            likedUsers: arrayRemove(currentUserId)
          });
        } else {
          likedUsers = [...likedUsers, currentUserId];
          await updateDoc(postRef, {
            likedUsers: arrayUnion(currentUserId)
          });
        }

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

type UsersWithLikeCount = Pick<PostType, 'uid' | 'likeCount'>;
type likeCountPerUserType = {
  uid: string;
  totalLikes: number;
};

// TOP10 user list
const getTopUsers = async () => {
  try {
    const postRef = collection(db, 'posts');
    const querySnapshot = await getDocs(postRef);

    const posts: UsersWithLikeCount[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data() as PostType;
      const post = {
        uid: docData.uid,
        likeCount: docData.likeCount
      };
      posts.push(post);
    });

    // 좋아요 합계 계산
    const likeCountPerUser = posts.reduce<Record<string, number>>((acc, post) => {
      if (!acc[post.uid!]) {
        acc[post.uid!] = 0;
      }
      acc[post.uid!] += post.likeCount!;
      return acc;
    }, {});

    // 객체를 배열로 변환
    const usersWithLikeCounts = Object.entries(likeCountPerUser).map(([uid, totalLikes]) => ({
      uid,
      totalLikes
    }));
    const topUsers: likeCountPerUserType[] = usersWithLikeCounts.sort((a, b) => b.totalLikes - a.totalLikes);
    return topUsers;
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
      return '';
    }
  } catch (error) {
    console.error('Error getting files: ', error);
    return null;
  }
};

export { getPosts, getAdminContents, getPopularContents, updateLikedUsers, getTopUsers, downloadImageURL };
