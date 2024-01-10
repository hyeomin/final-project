// Ashley가 만든 페이지입니다. 혹시 authApi 파일이 필요하시면 합치거나 제가 별도로 만들게요! (@Hailey)

import { collection, getDocs, query } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';
import { db } from '../shared/firebase';
import { UserType } from '../types/UserType';

// user 콜렉션 전부 가져오기

const getAllUsers = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.USERS));
    const querySnapshot = await getDocs(q);

    const userData: UserType[] = [];

    querySnapshot.forEach((doc) => {
      const docData = doc.data() as Omit<UserType, 'id'>;
      userData.push({ id: doc.id, ...docData });
    });
    return userData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getAllUsers };
