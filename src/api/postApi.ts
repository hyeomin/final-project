import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
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
    console.error('Error adding document: ', error);
  }
};

export { addPost };
