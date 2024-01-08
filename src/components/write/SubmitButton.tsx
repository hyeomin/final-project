import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../shared/firebase';

type Props = {
  newPost: Omit<PostType, 'id'>;
  imageList: File[];
};

function SubmitButton({ newPost, imageList }: Props) {
  const navigate = useNavigate();

  const onSubmitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const confirmation = window.confirm('등록하시겠습니까?');
    if (!confirmation) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      console.log('Document written with ID: ', docRef.id);
      const postId = docRef.id;

      for (const file of imageList) {
        const imageRef = ref(storage, `posts/${postId}/${file.name}`);
        await uploadBytes(imageRef, file);
      }

      navigate('/'); // 업로드된 게시물로 이동해야
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <button>임시 저장</button>
      <button onClick={onSubmitHandler}>완료</button>
    </div>
  );
}

export default SubmitButton;
