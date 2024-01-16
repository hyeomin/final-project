import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Editor from '../components/write/Editor';
import Hashtag from '../components/write/Hashtag';
import ImageUploadTest from '../components/write/ImageUploadTest';
import Header from '../components/write/WriteHeader';
import { foundPostState, isEditingState } from '../recoil/posts';

export type IsEditingProps = {
  foundPost: PostType | undefined;
  isEditing: boolean;
};

function Write() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);
  const [foundPost, setFoundPost] = useRecoilState<PostType | undefined>(foundPostState);
  const [editingImageList, setEditingImageList] = useState<string[]>([]);

  const { state } = useLocation();

  // isEditing인지 확인하고 state 변경
  useEffect(() => {
    if (state) {
      setFoundPost(state.foundPost);
      setIsEditing(true);
    }
  }, [state]);

  return (
    <Container>
      <Header />
      <Editor foundPost={foundPost} isEditing={isEditing} />
      <Spacer />
      <Hashtag foundPost={foundPost} isEditing={isEditing} />
      {/* <ImageUpload foundPost={foundPost} isEditing={isEditing} editingImageList={editingImageList} /> */}
      <ImageUploadTest foundPost={foundPost} isEditing={isEditing} />
    </Container>
  );
}

export default Write;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 50px 0;
`;

const Spacer = styled.div`
  height: 30px;
`;
