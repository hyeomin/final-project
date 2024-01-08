// import { doc, addDoc, collection, getDocs, query, deleteDoc, updateDoc } from '@firebase/firestore';
// import { db } from '../../../shared/firebase';
// import { QUERY_KEYS } from '../../../query/keys';


export type Comment = {
  id?: string;
  uid?: string;
  content?: string;
  profileImg?: string;
  createdAt?: string;
};

// //posts 가져오기
// const getPosts = async () => {
//   try {
//     const q = query(collection(db, QUERY_KEYS.POSTS));
//     const querySnapshot = await getDocs(q);

//     const posts: Post[] = [];
//     querySnapshot.forEach((doc) => {
//       posts.push({ id: doc.id, ...doc.data() });
//     });
//     return posts;
//   } catch (error) {
//     console.log(error);
//   }
// };

// //게시물 추가
// const addPost = async (newPost: Post)=> {
//   try {
//     const collectionRef = collection(db, QUERY_KEYS.POSTS);

//     const resp = await addDoc(collectionRef, newPost);
//     console.log('addPost의 resp ==>', resp);
//   } catch (error) {
//     console.log('error', error);
//   }
// };

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

// //코멘트 가져오기
// const getComments = async () => {
//   const id = 'fUc0v4igU6D8b0h3ZRLO';
//   try {
//     const q = query(collection(db, QUERY_KEYS.POSTS, id, "comments"));
//     const querySnapshot = await getDocs(q);

//     const comments: Comment[] = [];
//     querySnapshot.forEach((doc) => {
//       comments.push(doc.data());
//     });
//     return comments;
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

// export { getPosts, addPost, updatePost, deletePost, getComments, deleteComment };
