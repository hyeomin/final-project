import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import { db } from '../shared/firebase';
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { Category } from '../components/viewAll/ViewAllBody';

//관리자 (콘텐츠 by Mango)
export const getAdminPostList =
  (category: Category) => async (pageParam: undefined | QueryDocumentSnapshot<DocumentData, DocumentData>) => {
    const q = pageParam
      ? query(collection(db, 'posts'), where('role', '==', 'admin'), startAfter(pageParam), limit(4))
      : query(collection(db, 'posts'), where('role', '==', 'admin'), limit(4));

    const querySnapShot = await getDocs(q);
    return querySnapShot.docs;
  };

//카테고리(1) 친환경 노하우
export const getknowHowList = async ({
  pageParam
}: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>) => {
  const q = pageParam
    ? query(collection(db, 'test'), where('category', '==', 'knowHow'), startAfter(pageParam), limit(4))
    : query(collection(db, 'test'), where('category', '==', 'knowHow'), limit(4));

  const querySnapShot = await getDocs(q);

  return querySnapShot.docs;
};
//카테고리(2) 제품 추천
export const getRecommendList = async ({
  pageParam
}: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>) => {
  const q = pageParam
    ? query(collection(db, 'test'), where('category', '==', 'recommendation'), startAfter(pageParam), limit(4))
    : query(collection(db, 'test'), where('category', '==', 'recommendation'), limit(4));

  const querySnapShot = await getDocs(q);

  return querySnapShot.docs;
};
//카테고리(3) 제품 나눔
export const getShareList = async ({
  pageParam
}: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>) => {
  const q = pageParam
    ? query(collection(db, 'test'), where('category', '==', 'sharing'), startAfter(pageParam), limit(4))
    : query(collection(db, 'test'), where('category', '==', 'sharing'), limit(4));

  const querySnapShot = await getDocs(q);

  return querySnapShot.docs;
};
//카테고리(4) 습관 인증
export const getHabitList = async ({
  pageParam
}: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>) => {
  const q = pageParam
    ? query(collection(db, 'test'), where('category', '==', 'habit'), startAfter(pageParam), limit(4))
    : query(collection(db, 'test'), where('category', '==', 'habit'), limit(4));

  const querySnapShot = await getDocs(q);

  return querySnapShot.docs;
};

export const getCategoryPosts =
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
