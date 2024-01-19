import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import SelectCategory from '../SelectCategory';
import imageHandler from '../imageHandler';

import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';

import 'react-quill/dist/quill.snow.css';
import { postInputState } from '../../../recoil/posts';
import theme from '../../../styles/theme';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

function Editor() {
  const TITLE = 'title';

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { title, content } = postInput;

  const quillRef = useRef<ReactQuill>(null);

  if (!ImageFormats.registered) {
    ImageFormats.registered = true;
  }

  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
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
        },
        ImageResize: {
          modules: ['Resize']
        }
      }
    };
  }, []);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
    'float',
    'height',
    'width'
  ];

  const editorStyle = { height: '400px', maxHeight: '800px' };

  return (
    <WritingArea>
      <SelectCategory />
      <input
        name={TITLE}
        value={title}
        onChange={(event) => setPostInput({ ...postInput, title: event.target.value })}
        placeholder="제목을 입력하세요."
      />
      <EditorContainer>
        <ReactQuill
          style={editorStyle}
          theme="snow"
          value={content}
          onChange={(newContent) => setPostInput({ ...postInput, content: newContent })}
          modules={modules}
          formats={formats}
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

  & input {
    font-size: 18px;
    padding: 15px 10px;
    border-radius: 10px;
    border: 1px solid ${theme.color.lightgray};
    background: #f3f3f3;
  }
`;

const EditorContainer = styled.div`
  .ql-editor {
    font-size: 18px;

    strong {
      font-weight: bold;
    }

    em {
      font-style: italic;
    }
  }
`;
