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

//관리자 (콘텐츠 by Mango)
export const getAdminPostList = async (
  pageParam: undefined | QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<PostType[]> => {
  console.log('pageParam', pageParam);

  let lastVisible;

  const q = pageParam
    ? query(collection(db, 'test'), where('role', '==', 'admin'), startAfter(pageParam), limit(4))
    : query(collection(db, 'test'), where('role', '==', 'admin'), limit(4));

  const querySnapShot = await getDocs(q);

  lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1];
  return querySnapShot.docs;
  // return querySnapShot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...(doc.data() as Omit<PostType, 'id'>) //id 제외하고 나머지 필드를 PostType으로 변환
  // }));
};

//카테고리(1) 친환경 노하우
export const getknowHowList = async (): Promise<PostType[]> => {
  const q = query(collection(db, 'test'), where('category', '==', 'knowHow'));
  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PostType, 'id'>) //id 제외하고 나머지 필드를 PostType으로 변환
  }));
};

//카테고리(2) 제품 추천
export const getRecommendList = async (): Promise<PostType[]> => {
  const q = query(collection(db, 'test'), where('category', '==', 'recommendation'));
  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PostType, 'id'>) //id 제외하고 나머지 필드를 PostType으로 변환
  }));
};

//카테고리(3) 제품 나눔
export const getShareList = async (): Promise<PostType[]> => {
  const q = query(collection(db, 'test'), where('category', '==', 'sharing'));
  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PostType, 'id'>) //id 제외하고 나머지 필드를 PostType으로 변환
  }));
};

//카테고리(4) 습관 인증
export const getHabitList = async (): Promise<PostType[]> => {
  const q = query(collection(db, 'test'), where('category', '==', 'habit'));
  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PostType, 'id'>) //id 제외하고 나머지 필드를 PostType으로 변환
  }));
};
