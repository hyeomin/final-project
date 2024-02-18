import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { auth, db } from 'shared/firebase';
import { Category } from 'types/PostListType';
import { PostType, PostTypeFirebase } from 'types/PostType';

//관리자 (콘텐츠 by Mango)
export const getAdminPostList = async (context: {
  pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}) => {
  const { pageParam } = context;
  const q = pageParam
    ? query(
        collection(db, 'posts'),
        where('role', '==', 'admin'),
        orderBy('createdAt', 'desc'),
        startAfter(pageParam),
        limit(3)
      )
    : query(collection(db, 'posts'), where('role', '==', 'admin'), orderBy('createdAt', 'desc'), limit(6));

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs;
};

// 사용자 (카테고리별)
export const getCategoryPosts =
  (category: Category) =>
  async ({
    pageParam
  }: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>) => {
    let q: Query<DocumentData> = query(collection(db, 'posts'), where('role', '==', 'user'));

    if (category !== 'total') {
      q = query(q, where('category', '==', category));
    }

    if (pageParam) {
      q = query(q, orderBy('createdAt', 'desc'), startAfter(pageParam), limit(4));
    } else {
      q = query(q, orderBy('createdAt', 'desc'), limit(12));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  };

export const getFirstPage = async (category: Category): Promise<PostTypeFirebase[]> => {
  let q: Query<DocumentData> = await query(
    collection(db, 'posts'),
    where('role', '==', 'user'),
    orderBy('createdAt', 'desc'),
    limit(12)
  );
  if (category !== 'total') {
    q = query(q, where('category', '==', category));
  }

  const querySnapshot = await getDocs(q);

  const posts: PostTypeFirebase[] = [];
  querySnapshot.forEach((doc) => {
    const postData = doc.data() as Omit<PostTypeFirebase, 'id'>;
    const isLiked = auth.currentUser ? postData.likedUsers.includes(auth.currentUser.uid) : false;
    posts.push({ id: doc.id, ...postData, isLiked: isLiked, snapshot: doc });
  });
  return posts;
};

export const getNextPage = async (lastVisible: string, category: Category): Promise<PostTypeFirebase[]> => {
  // 여기에서는 lastItemId를 사용하여 문서 스냅샷 얻기
  // lastItemId를 사용하여 마지막 문서 스냅샷을 찾기
  const lastDocumentRef = doc(db, 'posts', lastVisible);
  const lastSnapshot = await getDoc(lastDocumentRef);

  let q: Query<DocumentData> = await query(
    collection(db, 'posts'),
    where('role', '==', 'user'),
    orderBy('createdAt', 'desc'),
    startAfter(lastSnapshot),
    limit(4)
  );
  if (category !== 'total') {
    q = query(q, where('category', '==', category));
  }

  const querySnapshot = await getDocs(q);
  const posts: PostTypeFirebase[] = [];
  querySnapshot.forEach((doc) => {
    const postData = doc.data() as Omit<PostTypeFirebase, 'id'>;
    const isLiked = auth.currentUser ? postData.likedUsers.includes(auth.currentUser.uid) : false;
    posts.push({ id: doc.id, ...postData, isLiked: isLiked, snapshot: doc });
  });
  return posts;
};
