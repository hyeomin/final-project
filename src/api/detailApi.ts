import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { QUERY_KEYS } from '../query/keys';
import { auth, db, storage } from '../shared/firebase';

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
      console.log('User data:', userData);
      return userData;
    } else {
      console.log('그런 문서 없음');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
type AddCommentParams = {
  newComment: Omit<CommentType, 'id'>;
  postId: string;
};

//새 댓글 추가
const addComment = async ({ newComment, postId }: AddCommentParams) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  const commentRef = collection(db, 'posts', postId, 'comments');
  const resp = await addDoc(commentRef, newComment);
  console.log('코멘트 추가===>', resp);
};

//코멘트 가져오기
const getComments = async () => {
  try {
    const commentRef = collection(db, QUERY_KEYS.POSTS, 'ykHM5RAzFDJJFk0Yym2v', 'comments');
    const commentQuery = query(commentRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(commentQuery);
    const comments: CommentType[] = [];

    querySnapshot.forEach((doc) => {
      console.log('doc.data() ===>', doc.data());
      // comments.push({id: doc.id, ...doc.data()});
    });
    return comments;
  } catch (error) {
    console.log('error', error);
  }
};

const downloadCoverImageURLs = async (postId: string) => {
  try {
    const listRef = ref(storage, `posts/${postId}`);
    const res = await listAll(listRef);

    if (res.items.length > 0) {
      const urls = await Promise.all(res.items.map((fileRef) => getDownloadURL(fileRef)));
      return urls;
    } else {
      console.log('No files found in the directory');
      return [];
    }
  } catch (error) {
    console.error('Error getting files: ', error);
    return null;
  }
};

// // 게시물 수정
// const updatePost = async ({ id, content }: Post) => {
//   try {
//     console.log('content ===> ', content);
//     const postRef = doc(db, QUERY_KEYS.POSTS, id!);
//     await updateDoc(postRef, { content });
//     console.log('수정완료');
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// //게시물 삭제
// const deletePost = async (id: string) => {
//   try {
//     const postRef = doc(db, QUERY_KEYS.POSTS, id);
//     await deleteDoc(postRef);
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// //코멘트 삭제
// const deleteComment = async (id: string) => {
//   const postId = 'fUc0v4igU6D8b0h3ZRLO';
//   const commentId = id;
//   console.log('코멘트의 아이디 ==>',commentId)

//   const postRef = doc(db, QUERY_KEYS.POSTS, postId);
//   console.log('postRef==>', postRef)
//   const commentRef = doc(postRef, "comments", commentId);
//   console.log('commentRef==>', commentRef)
//   try {
//     await deleteDoc(commentRef);
//     console.log('삭제완료');
//   } catch (error) {
//     console.log('error', error);
//   }
// };

export { addComment, downloadCoverImageURLs, getUserData };
