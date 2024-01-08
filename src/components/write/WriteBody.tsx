import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import usePostState from '../../hooks/usePostState';
import { categoryRecoilState } from '../../recoil/posts';
import ImageUpload from './ImageUpload';
import SubmitButton from './SubmitButton';

function WriteBody() {
  const HASHTAG = 'hashtag';
  const TITLE = 'title';

  const { category, setCategory, title, setTitle, content, setContent, hashtag, setHashtag, imageList, setImageList } =
    usePostState();
  const categoryList = useRecoilValue(categoryRecoilState);
  const quillRef = useRef<ReactQuill>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === HASHTAG) {
      setHashtag(value);
    }
  };

  const newPost = {
    category,
    title,
    content,
    createdAt: Number(new Date()),
    updatedAt: Number(new Date()),
    hashtag: null,
    uid: null,
    likeCount: 0,
    likedUsers: null,
    role: 'user'
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image']
        ]
      }
    };
  }, []);

  return (
    <Container>
      <WritingArea>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="" disabled hidden>
            카테고리
          </option>
          {categoryList.map((item) => {
            return <option key={item.id}>{item.name}</option>;
          })}
        </select>
        <input
          name={TITLE}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력하세요."
        />
        <div>
          <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} ref={quillRef} />
        </div>
      </WritingArea>
      <ImageUpload imageList={imageList} setImageList={setImageList} />
      <HashtagArea>
        <RecommendedTags>추천 해시태그</RecommendedTags>
        <HashtagInputContainer>
          <input name={HASHTAG} value={hashtag} onChange={onChangeHandler} placeholder="해시태그를 추가하세요." />
          <button>추가</button>
        </HashtagInputContainer>
        <SelectedTagList>선택된 해시태그</SelectedTagList>
      </HashtagArea>
      <SubmitButton newPost={newPost} imageList={imageList} />
    </Container>
  );
}

export default WriteBody;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
`;

const WritingArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  background-color: white;

  & select {
    flex: 0;
  }

  & input {
    font-size: x-large;
    padding: 10px;
  }

  & div {
  }
`;

const HashtagArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  padding: 10px;
  background-color: pink;
`;

const RecommendedTags = styled.div`
  background-color: lightblue;
`;

const HashtagInputContainer = styled.div`
  display: flex;
  column-gap: 10px;
  & input {
    display: flex;
    width: 100%;
  }
`;

const SelectedTagList = styled.div`
  background-color: lightblue;
`;
