import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { QUERY_KEYS } from '../query/keys';
import { db, storage } from '../shared/firebase';

type AddPostProps = {
  newPost: Omit<PostType, 'id'>;
  imageFileforUpload: File[];
};

const addPost = async ({ newPost, imageFileforUpload }: AddPostProps) => {
  try {
    const docRef = await addDoc(collection(db, QUERY_KEYS.POSTS), newPost);
    console.log('Document written with ID: ', docRef.id);
    const postId = docRef.id;

    for (const file of imageFileforUpload) {
      const imageRef = ref(storage, `${QUERY_KEYS.POSTS}/${docRef.id}/${file.name}`);
      await uploadBytes(imageRef, file);
    }
    return postId;
  } catch (error) {
    console.error('Error adding post: ', error);
  }
};

const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(db, QUERY_KEYS.POSTS, postId));
    console.log('포스트 삭제 완료');
  } catch (error) {
    console.log('포스트 삭제 오류', error);
  }
};

type uploadPostProps = {
  editingPost: {
    title: string;
    content: string;
    category: string;
    hashtags: string[] | null;
    updatedAt: number;
  };
  postId: string;
  imageFileforUpload: File[];
  imageUrltoDelete: string[];
};

const updatePost = async ({ editingPost, postId, imageFileforUpload, imageUrltoDelete }: uploadPostProps) => {
  try {
    const docRef = await updateDoc(doc(db, `${QUERY_KEYS.POSTS}/${postId}`), editingPost);
    console.log('포스트 업데이트 성공');

    // 새로운 이미지 업로드
    for (const file of imageFileforUpload) {
      const imageRef = ref(storage, `${QUERY_KEYS.POSTS}/${postId}/${file.name}`);
      await uploadBytes(imageRef, file);
    }

    // 삭제된 이미지 Storage에서 삭제
    for (const url of imageUrltoDelete) {
      const imagehttpsReference = ref(storage, url);
      await deleteObject(imagehttpsReference);
    }
  } catch (error) {
    console.log('포스트 업데이트 오류', error);
  }
};

export type uploadImageProps = {
  selectedImages: File[];
  postId: string;
};

const uploadImages = async ({ selectedImages }: uploadImageProps) => {
  try {
    const uploadedImageUrls = []; // 업로드된 이미지 URL을 저장할 배열
    for (const file of selectedImages) {
      const imageRef = ref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);
      uploadedImageUrls.push(imageUrl); // 배열에 URL 추가
    }
    return uploadedImageUrls; // 업로드된 이미지 URL 배열 반환
  } catch (error) {
    console.error('Error adding post: ', error);
  }
};

const deleteImage = async (url: string) => {
  try {
    const httpsReference = ref(storage, url);
    const something = await deleteObject(httpsReference);
    console.log(9999);
    console.log('something-->', something);
  } catch (error) {
    console.error('Error deleting post: ', error);
  }
};

export { addPost, deleteImage, deletePost, updatePost, uploadImages };
