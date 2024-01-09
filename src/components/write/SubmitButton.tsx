import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { coverImageState, titleState } from '../../recoil/posts';
import { db, storage } from '../../shared/firebase';
import { PostType2 } from '../../types/Posts';

type Props = {
  newPost: Omit<PostType2, 'id'>;
};

function SubmitButton({ newPost }: Props) {
  const [coverImageList, setCoverImageList] = useRecoilState(coverImageState);
  const [title, setTitle] = useRecoilState(titleState);

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

      for (const file of coverImageList) {
        const imageRef = ref(storage, `posts/${postId}/${file.name}`);
        await uploadBytes(imageRef, file);
      }
      setTitle('');
      navigate(`/detail/${postId}`);
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
