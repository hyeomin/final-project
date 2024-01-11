import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../shared/firebase';
import { QUERY_KEYS } from '../query/keys';


// 현재 로그인한 user Data 가져오기
const getUserData = async () => {
  const userId = auth.currentUser?.uid;
  console.log('userId====>', userId);
  if (!userId) return null;

  try {
    const usersRef = collection(db, QUERY_KEYS.USERS);
    const q = query(usersRef, where('uid', '==', userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      //스냅샷 속성 empty
    //   console.log('스냅샷===>', querySnapshot);
      const userData = querySnapshot.docs[0].data();
      // console.log('User data:', userData);
      return userData;
    } else {
      console.log('그런 문서 없음');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

//새 댓글 추가
const addComment=async (newComment: Comment) => {
  const userId = auth.currentUser?.uid;
  if(!userId) return;
const docRef = await addDoc(collection(db, "cities"), {
  
});
console.log("Document written with ID: ", docRef.id);
} 

export { getUserData, addComment };
