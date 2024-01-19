import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import { db } from '../shared/firebase';
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
import { Category } from '../components/viewAll/ViewAllBody';

//관리자 (콘텐츠 by Mango)
export const getAdminPostList =
  (category: string) =>
  async ({
    pageParam
  }: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>) => {
    const q = pageParam
      ? query(
          collection(db, 'posts'),
          where('role', '==', 'admin'),
          orderBy('createdAt', 'desc'),
          startAfter(pageParam),
          limit(2)
        )
      : query(collection(db, 'posts'), where('role', '==', 'admin'), orderBy('createdAt', 'desc'), limit(2));

    const querySnapShot = await getDocs(q);
    return querySnapShot.docs;
  };

// 사용자 (카테고리별)
export const getCategoryPosts =
  (category: Category) =>
  async ({
    pageParam
  }: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>) => {
    let q: Query<DocumentData> = query(collection(db, 'posts'), where('role', '==', 'user'), limit(4));

    if (category !== 'total') {
      q = query(q, where('category', '==', category));
    } else {
      q = query(q, orderBy('createdAt', 'desc'));
    }

    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    const querySnapShot = await getDocs(q);
    return querySnapShot.docs;
  };
