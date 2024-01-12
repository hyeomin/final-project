import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../shared/firebase';
import { QUERY_KEYS } from '../query/keys';

type AddComment = {
  newComment: Omit<CommentType, 'id'>;
  postId: string;
};

//새 댓글 CREATE
const addComment = async ({ newComment, postId }: AddComment) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const commentRef = collection(db, 'posts', postId, 'comments');
    await addDoc(commentRef, newComment);
  } catch (error) {
    console.log('error',error);
  }
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

type deleteType = {
  id: string;
  postId: string;
};

// //코멘트 DELETE
const deleteComment = async ({ id, postId }: deleteType) => {
  console.log('코멘트의 아이디 ==>', id);
  if (!id || !postId) return;

  const commentRef = doc(db, QUERY_KEYS.POSTS, postId, 'comments', id);
  console.log('commentRef==>', commentRef);
  try {
    await deleteDoc(commentRef);
    console.log('삭제완료');
  } catch (error) {
    console.log('error', error);
  }
};

type UpdateComment = {
  id: string;
  editingText: string;
  postId: string;
};
// // 게시물 UPDATE
const updateComment = async ({ postId, id, editingText: content }: UpdateComment) => {
  try {
    const postRef = doc(db, QUERY_KEYS.POSTS, postId, QUERY_KEYS.COMMENTS, id);
    const createdAt = Date.now();
    const resp = await updateDoc(postRef, { content, createdAt });
    console.log('수정완료==>', resp);
  } catch (error) {
    console.log('error', error);
  }
};

export { addComment, getComments, deleteComment, updateComment };
