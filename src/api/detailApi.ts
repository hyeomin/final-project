import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../shared/firebase';
import { QUERY_KEYS } from '../query/keys';

// 현재 로그인한 user Data 가져오기
const getUserData = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return null;

  try {
    const usersRef = collection(db, QUERY_KEYS.USERS);
    const q = query(usersRef, where('uid', '==', userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      //스냅샷 속성 empty
      //   console.log('스냅샷===>', querySnapshot);
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      console.log('그런 문서 없음');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
type AddComment= {
  newComment: Omit<CommentType, 'id'>;
  postId: string;
};

//새 댓글 CREATE
const addComment = async ({ newComment, postId }: AddComment) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  const commentRef = collection(db, 'posts', postId, 'comments');
  const resp = await addDoc(commentRef, newComment);
};

//코멘트 READ
const getComments = async (postId: string) => {
  try {
    const commentRef = collection(db, QUERY_KEYS.POSTS, postId, 'comments');
    const commentQuery = query(commentRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(commentQuery);

    const comments: CommentType[] = [];
    querySnapshot.forEach((doc) => {
      const commentData = doc.data() as CommentType;
      const comment = {
        ...commentData,
        id: doc.id
      };
      comments.push(comment);
    });
    return comments;
  } catch (error) {
    console.log('error', error);
  }
};

type deleteComment = {
  id: string;
  postId: string;
}

// //코멘트 DELETE
const deleteComment = async ({id, postId}: deleteComment) => {
  console.log('코멘트의 아이디 ==>',id)
  if(!id || !postId) return;

  const commentRef = doc(db, QUERY_KEYS.POSTS, postId, 'comments', id);
  console.log('commentRef==>', commentRef)
  try {
    await deleteDoc(commentRef);
    console.log('삭제완료');
  } catch (error) {
    console.log('error', error);
  }
};

type UpdateComment = {
  id: string;
  textArea: string;
  postId: string
}
// // 게시물 UPDATE
const updateComment = async ({ postId, id, textArea: content }: UpdateComment) => {
  try {
    const postRef = doc(db, QUERY_KEYS.POSTS, postId, QUERY_KEYS.COMMENTS, id);
    const createdAt = Date.now();
    const resp = await updateDoc(postRef, { content, createdAt});
    console.log('수정완료==>', resp);
    
  } catch (error) {
    console.log('error', error);
  }
};


export { getUserData, addComment, getComments, deleteComment, updateComment };
