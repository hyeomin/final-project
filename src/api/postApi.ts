import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { QUERY_KEYS } from '../query/keys';
import { db, storage } from '../shared/firebase';

type Props = {
  newPost: Omit<PostType, 'id'>;
  newImageFileList: File[];
};

const addPost = async ({ newPost, newImageFileList }: Props) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), newPost);
    console.log('Document written with ID: ', docRef.id);
    const postId = docRef.id;

    for (const file of newImageFileList) {
      const imageRef = ref(storage, `posts/${docRef.id}/${file.name}`);
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
    console.log('포스트 삭제완료');
  } catch (error) {
    console.log('포스트 삭제오류', error);
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

export { addPost, deleteImage, deletePost, uploadImages };
