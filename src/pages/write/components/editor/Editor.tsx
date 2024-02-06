import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { useRecoilState } from 'recoil';
import imageHandler from '../imageUpload/imageHandler';
import SelectCategory from './SelectCategory';

import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';

import 'react-quill/dist/quill.snow.css';
import { postInputState } from 'recoil/posts';
import St from './style';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

function Editor() {
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

  const editorStyle = { height: '600px', maxHeight: '800px' };

  const onContentChangeHandler = (newContent: string) => {
    setPostInput((prevInput) => ({ ...prevInput, content: newContent }));
  };

  return (
    <St.WritingArea>
      <SelectCategory />
      <input
        value={title}
        onChange={(event) => setPostInput({ ...postInput, title: event.target.value })}
        placeholder="제목을 입력하세요."
        tabIndex={1}
        maxLength={30}
      />
      <St.EditorContainer className="editor-container">
        <ReactQuill
          style={editorStyle}
          theme="snow"
          value={content}
          onChange={onContentChangeHandler}
          modules={modules}
          formats={formats}
          ref={quillRef}
          tabIndex={2}
        />
      </St.EditorContainer>
    </St.WritingArea>
  );
}

export default Editor;
