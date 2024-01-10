import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { contentState, titleState } from '../../recoil/posts';
import SelectCategory from './SelectCategory';
import imageHandler from './imageHandler';

function Editor() {
  const TITLE = 'title';

  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);

  const quillRef = useRef<ReactQuill>(null);

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

  const editorStyle = { height: '600px', maxHeight: '800px' };

  return (
    <WritingArea>
      <SelectCategory />
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
  overflow: hidden;

  .ql-editor {
    font-size: 18px; // Set your desired default font size here
  }
`;
