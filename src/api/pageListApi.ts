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
import { Category } from '../components/viewAll/ViewAllBody';
import { db } from '../shared/firebase';

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
    let q: Query<DocumentData> = query(
      collection(db, 'posts'),
      ///where('createdAt', '!=', null),
      where('role', '==', 'user')
    );

    if (category !== 'total') {
      q = query(q, where('category', '==', category));
    }

    // //정렬 되는 코드 + 총 8개만 나옴 + 색인 추가
    if (pageParam) {
      q = query(q, orderBy('createdAt', 'desc'), startAfter(pageParam), limit(4));
    } else {
      q = query(q, orderBy('createdAt', 'desc'), limit(4));
    }

    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs;
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  };
