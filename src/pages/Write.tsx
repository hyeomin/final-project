import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Editor from '../components/write/editor/Editor';
import Hashtag from '../components/write/hashtag/Hashtag';
import Header from '../components/write/header/WriteHeader';
import ImageUpload from '../components/write/imageUpload/ImageUpload';
import { initialPostInputState, postInputState } from '../recoil/posts';
import { useModal } from '../hooks/useModal';

function Write() {
  const modal = useModal();
  const location = useLocation();
  const { foundDetailPost } = location.state || {};

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  // 주소가 바뀌면 내용 날라가게

  // 임시저장된 데이터 불러올지; 취소하면 날라가게
  useEffect(() => {
    setTimeout(() => {
      const savedData = sessionStorage.getItem('savedData');
      if (savedData) {
        const onClickCancel = () => {
          setPostInput(initialPostInputState);
          onDeleteTempSaveHandler();
          modal.close();
          return;
        };

        const onClickConfirm = () => {
          setPostInput(JSON.parse(savedData));
          modal.close();
        };

        const openModalParams: Parameters<typeof modal.open>[0] = {
          title: '임시저장된 데이터가 있습니다.',
          message: '데이터를 불러오시겠습니까?',
          leftButtonLabel: '취소',
          onClickLeftButton: onClickCancel,
          rightButtonLabel: '확인',
          onClickRightButton: onClickConfirm
        };
        modal.open(openModalParams);

        // const confirmLoadSavedData = window.confirm('임시저장된 데이터가 있습니다. 불러오시겠습니까?');
        // // 취소하면 날라갑니다.
        // if (confirmLoadSavedData) {
        //   setPostInput(JSON.parse(savedData));
        // } else {
        //   setPostInput(initialPostInputState);
        //   onDeleteTempSaveHandler();
        //   return;
        // }
      }
    }, 700);
  }, []);

  // 임시저장된 데이터 삭제
  const onDeleteTempSaveHandler = () => {
    sessionStorage.removeItem('savedData');

    //모달
    const onClickSave = () => {
      modal.close();
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '삭제되었습니다.',
      message: '',
      leftButtonLabel: '',
      onClickLeftButton: undefined,
      rightButtonLabel: '확인',
      onClickRightButton: onClickSave
    };
    modal.open(openModalParams);
  };

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
      // setPostInput(initialPostInputState);
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
      {/* <ImageUploadTest /> */}
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
