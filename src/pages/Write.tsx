import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Editor from '../components/write/editor/Editor';
import Hashtag from '../components/write/hashtag/Hashtag';
import Header from '../components/write/header/WriteHeader';
import ImageUpload from '../components/write/imageUpload/ImageUpload';
import { initialPostInputState, isEditingPostState, postInputState } from '../recoil/posts';

function Write() {
  const location = useLocation();
  const { foundDetailPost } = location.state || {};
  console.log('foundDetailPost', foundDetailPost);

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const setIsEditingPost = useSetRecoilState(isEditingPostState);

  console.log('postInput-->', postInput);

  console.log('location-->', location);

  // 임시저장된 데이터 불러올지
  useEffect(() => {
    setTimeout(() => {
      const savedData = sessionStorage.getItem('savedData');
      if (savedData) {
        const confirmLoadSavedData = window.confirm('임시저장된 데이터가 있습니다. 불러오시겠습니까?');
        if (confirmLoadSavedData) {
          setPostInput(JSON.parse(savedData));
        } else {
          setPostInput(initialPostInputState);
          return;
        }
      }
    }, 700);
  }, []);

  // 새로고침 핸들러
  useEffect(() => {
    if (
      postInput.title === '' &&
      postInput.content === '' &&
      postInput.category === 'noCategory' &&
      postInput.hashtags.length === 0 &&
      postInput.coverImages.length === 0
    ) {
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = '');
    };

    // beforeunload 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
    };
  }, [postInput]);

  return (
    <Container>
      <Header isEditing={!!foundDetailPost} />
      <Editor />
      <Spacer />
      <Hashtag />
      <ImageUpload />
    </Container>
  );
}

export default Write;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 50px 0;
  width: 900px;
`;

const Spacer = styled.div`
  height: 30px;
`;
