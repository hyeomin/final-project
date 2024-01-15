import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { QUERY_KEYS } from '../query/keys';
import { db, storage } from '../shared/firebase';
import { PostType2 } from '../types/Posts';

type Props = {
  newPost: Omit<PostType2, 'id'>;
  coverImageList: File[];
};

const addPost = async ({ newPost, coverImageList }: Props) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), newPost);
    console.log('Document written with ID: ', docRef.id);
    const postId = docRef.id;

    for (const file of coverImageList) {
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

export { addPost, deletePost };
