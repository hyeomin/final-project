import { addDoc, collection, deleteDoc, doc, getDocs, increment, orderBy, query, updateDoc } from 'firebase/firestore';
import { QUERY_KEYS } from 'query/keys';
import { db } from 'shared/firebase';
import { CommentType } from 'types/PostType';

type AddComment = {
  newComment: Pick<CommentType, 'uid' | 'createdAt' | 'content'>;
  postId: string;
  currentUserId: string;
};

//새 댓글 CREATE
const addComment = async ({ newComment, postId, currentUserId }: AddComment) => {
  if (!currentUserId) return;
  const commentRef = collection(db, QUERY_KEYS.POSTS, postId, QUERY_KEYS.COMMENTS);
  await addDoc(commentRef, newComment);

  const postRef = doc(db, QUERY_KEYS.POSTS, postId);
  await updateDoc(postRef, { commentCount: increment(1) });
};

//코멘트 READ
const getComments = async (postId: string) => {
  const commentRef = collection(db, QUERY_KEYS.POSTS, postId, QUERY_KEYS.COMMENTS);
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
};

type deleteType = {
  id: string;
  postId: string;
};

//코멘트 DELETE
const deleteComment = async ({ id, postId }: deleteType) => {
  if (!id || !postId) return;
  const commentRef = doc(db, QUERY_KEYS.POSTS, postId, QUERY_KEYS.COMMENTS, id);

  await deleteDoc(commentRef);

  const postRef = doc(db, QUERY_KEYS.POSTS, postId);
  await updateDoc(postRef, { commentCount: increment(-1) });
};

type UpdateComment = {
  id: string;
  editingText: string;
  postId: string;
};

// 게시물 UPDATE
const updateComment = async ({ postId, id, editingText: content }: UpdateComment) => {
  const postRef = doc(db, QUERY_KEYS.POSTS, postId, QUERY_KEYS.COMMENTS, id);
  const createdAt = Date.now();
  await updateDoc(postRef, { content, createdAt });
};

export { addComment, deleteComment, getComments, updateComment };
