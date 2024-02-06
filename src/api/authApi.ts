// Ashley가 만든 페이지입니다. 혹시 authApi 파일이 필요하시면 합치거나 제가 별도로 만들게요! (@Hailey)

import { User, updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { QUERY_KEYS } from 'query/keys';
import { auth, db, storage } from 'shared/firebase';
import { UserType } from 'types/UserType';

// user 콜렉션 전부 가져오기
const getAllUsers = async () => {
  const q = query(collection(db, QUERY_KEYS.USERS));
  const querySnapshot = await getDocs(q);

  const userData: UserType[] = [];

  querySnapshot.forEach((doc) => {
    const docData = doc.data() as Omit<UserType, 'id'>;
    userData.push({ id: doc.id, ...docData });
  });
  return userData;
};

// 특정 유저 가져오기 (상세페이지 post 안의 uid)
const getUser = async (userId: string) => {
  const docRef = doc(db, QUERY_KEYS.USERS, userId);
  const userSnap = await getDoc(docRef);
  if (!userSnap.exists()) {
    return undefined;
  }

  const userData = userSnap.data() as Omit<UserType, 'id'>;
  const user: UserType = { id: userSnap.id, ...userData };
  return user;
  // } catch (error) {
  //   console.log(error);
  //   return undefined;
  // }
};

// 프로필 수정
export type updateProfileInfoProps = {
  authCurrentUser: User;
  displayName: string | null;
  profileImage: string | null;
};

const updateProfileInfo = async ({ authCurrentUser, displayName, profileImage }: updateProfileInfoProps) => {
  await updateProfile(authCurrentUser!, {
    displayName: displayName,
    photoURL: profileImage
  });
  await authCurrentUser.reload();
  const updatedUser = auth.currentUser;
  // console.log('프로필 업데이트 성공');

  if (updatedUser) {
    const userDocRef = doc(db, 'users', updatedUser.uid);
    // const userDocSnapshot = await getDoc(userDocRef);
    //console.log('userDocSnapshot-->', userDocSnapshot);

    // 컬렉션에 있는 users 필드 정보 수정
    await updateDoc(userDocRef, {
      displayName: updatedUser?.displayName,
      profileImg: updatedUser?.photoURL,
      uid: updatedUser?.uid
    });
  }

  return updatedUser;
};

export type updateProfileImageProps = {
  authCurrentUser: User;
  profileImage: File;
};

const updateProfileImage = async ({ authCurrentUser, profileImage }: updateProfileImageProps) => {
  const imageRef = ref(storage, `userProfile/${authCurrentUser?.uid}`);
  const snapshot = await uploadBytes(imageRef, profileImage);
  const profileImageURL = await getDownloadURL(snapshot.ref);
  return profileImageURL;
};

export { getAllUsers, getUser, updateProfileImage, updateProfileInfo };
