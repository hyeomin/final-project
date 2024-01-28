import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { QUERY_KEYS } from '../query/keys';
import { db, storage } from '../shared/firebase';
import { PostInputType, PostType } from '../types/PostType';

type AddPostProps = {
  newPost: Omit<PostType, 'id'>;
};

const addPost = async ({ newPost }: AddPostProps) => {
  try {
    const docRef = await addDoc(collection(db, QUERY_KEYS.POSTS), newPost);
    //console.log('Document written with ID: ', docRef.id);
    const postId = docRef.id;

    return postId;
  } catch (error) {
    console.error('Error adding post: ', error);
    return error;
  }
};

const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(db, QUERY_KEYS.POSTS, postId));
    //console.log('포스트 삭제 완료');
  } catch (error) {
    console.log('포스트 삭제 오류', error);
  }
};

type uploadPostProps = {
  editingPost: PostInputType & {
    updatedAt: number;
  };
  postId: string;
};

const updatePost = async ({ editingPost, postId }: uploadPostProps) => {
  try {
    await updateDoc(doc(db, `${QUERY_KEYS.POSTS}/${postId}`), editingPost);
    //console.log('포스트 업데이트 성공');
  } catch (error) {
    console.log('포스트 업데이트 오류', error);
  }
};

export type uploadImageProps = {
  coverImage: File;
};

const uploadSingleImage = async ({ coverImage }: uploadImageProps) => {
  try {
    const coverImagesRef = ref(storage, `${QUERY_KEYS.COVER_IMAGES}/${coverImage.name}`);
    const snapshot = await uploadBytes(coverImagesRef, coverImage);
    const downloadedImageUrl = await getDownloadURL(snapshot.ref);
    //console.log('이미지 업로드 성공');
    return { name: coverImage.name, url: downloadedImageUrl };
  } catch (error) {
    console.log('이미지 업로드 실패', error);
  }
};

const deleteImage = async (url: string) => {
  try {
    const httpsReference = ref(storage, url);
    const something = await deleteObject(httpsReference);
    console.error('이미지 삭제 성공: ', something);
  } catch (error) {
    console.error('이미지 삭제 실패: ', error);
  }
};

export { addPost, deleteImage, deletePost, updatePost, uploadSingleImage };
