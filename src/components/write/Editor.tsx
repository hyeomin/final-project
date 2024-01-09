import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryListState, categoryState, contentState, titleState } from '../../recoil/posts';
import imageHandler from './imageHandler';

function Editor() {
  const TITLE = 'title';

  const [category, setCategory] = useRecoilState(categoryState);
  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);

  const categoryList = useRecoilValue(categoryListState);

  const quillRef = useRef<ReactQuill>(null);

  const onChangeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNameKor = event.target.value;
    const selectedNameEng = categoryList.find((category) => category.nameKor === selectedNameKor);
    setCategory(selectedNameEng ? selectedNameEng.nameEng : categoryList[0].nameEng);
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
        ],
        handlers: {
          image: () => imageHandler(quillRef)
        }
      }
    };
  }, []);

  const editorStyle = { height: '600px', overflow: 'auto' };

  return (
    <WritingArea>
      <select value={category} onChange={onChangeSelectHandler}>
        <option value="" disabled hidden>
          카테고리
        </option>
        {categoryList.map((item) => {
          return <option key={item.id}>{item.nameKor}</option>;
        })}
      </select>
      <input
        name={TITLE}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="제목을 입력하세요."
      />
      <EditorContainer>
        <ReactQuill
          style={editorStyle}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          ref={quillRef}
        />
      </EditorContainer>
    </WritingArea>
  );
}

export default Editor;

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
`;

const EditorContainer = styled.div`
  padding: 10px 0;
`;
