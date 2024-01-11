import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import { db } from '../shared/firebase';
import {
  DocumentData,
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
    const q = pageParam
      ? query(
          collection(db, 'posts'),
          where('category', '==', category),
          where('role', '==', 'user'),
          startAfter(pageParam),
          limit(4)
        )
      : query(collection(db, 'posts'), where('category', '==', category), where('role', '==', 'user'), limit(4));

    const querySnapShot = await getDocs(q);
    return querySnapShot.docs;
  };

//test
export const sortPopularCategoryPosts =
  (category: Category) =>
  async ({
    pageParam
  }: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>) => {
    const q = pageParam
      ? query(collection(db, 'posts'), where('category', '==', category), startAfter(pageParam), limit(4))
      : query(collection(db, 'posts'), where('category', '==', category), limit(4));

    const querySnapShot = await getDocs(q);
    return querySnapShot.docs;
  };
