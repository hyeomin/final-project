import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { db } from 'shared/firebase';
import { Category } from 'types/PostListType';

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
