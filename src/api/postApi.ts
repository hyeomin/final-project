import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { QUERY_KEYS } from 'query/keys';
import { db, storage } from 'shared/firebase';
import { PostInputType, PostType } from 'types/PostType';
import { createThumbnailImageFile } from 'util/imageResize';

const addPost = async (newPost: Omit<PostType, 'id'>) => {
  const docRef = await addDoc(collection(db, QUERY_KEYS.POSTS), newPost);
  console.log('Document written with ID: ', docRef.id);
  const postId = docRef.id;
  return postId;
};

const deletePost = async (postId: string) => {
  await deleteDoc(doc(db, QUERY_KEYS.POSTS, postId));
  console.log('게시글 삭제 완료');
};

type uploadPostProps = {
  editingPost: PostInputType & {
    updatedAt: number;
  };
  postId: string;
};

const updatePost = async ({ editingPost, postId }: uploadPostProps) => {
  await updateDoc(doc(db, `${QUERY_KEYS.POSTS}/${postId}`), editingPost);
  console.log('포스트 업데이트 성공');
};

export type uploadImageProps = {
  coverImage: File;
};

const uploadSingleImage = async ({ coverImage }: uploadImageProps) => {
  const coverImagesRef = ref(storage, `${QUERY_KEYS.COVER_IMAGES}/${coverImage.name}`);
  const snapshot = await uploadBytes(coverImagesRef, coverImage);
  const coverImageUrl = await getDownloadURL(snapshot.ref);
  console.log('이미지 업로드 및 다운로드 성공');

  // 썸네일로 만들어서 Firebase 올리기
  let downloadedThumbUrl = null;
  try {
    const resizedCover: File = await createThumbnailImageFile(coverImage);
    const thumbnailRef = ref(storage, `${QUERY_KEYS.COVER_IMAGES}/thumbnails/${coverImage.name}`);
    const thumbSnapShot = await uploadBytes(thumbnailRef, resizedCover);
    downloadedThumbUrl = await getDownloadURL(thumbSnapShot.ref);
    console.log('썸네일 업로드 성공');
  } catch (error) {
    console.log('썸네일 업로드 실패');
  }

  return { name: coverImage.name, url: coverImageUrl, thumbnailUrl: downloadedThumbUrl };
};

const deleteImage = async (url: string) => {
  const httpsReference = ref(storage, url);
  await deleteObject(httpsReference);
  console.log('이미지 삭제 성공');
  return url;
};

export { addPost, deleteImage, deletePost, updatePost, uploadSingleImage };
