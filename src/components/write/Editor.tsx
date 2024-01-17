import { useEffect, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import SelectCategory from './SelectCategory';
import imageHandler from './imageHandler';

import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';

import 'react-quill/dist/quill.snow.css';
import { IsEditingProps } from '../../pages/Write';
import { postState } from '../../recoil/posts';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

function Editor({ foundPost, isEditing }: IsEditingProps) {
  const TITLE = 'title';

  const [post, setPost] = useRecoilState(postState);
  const { title, content } = post;

  const quillRef = useRef<ReactQuill>(null);

  if (!ImageFormats.registered) {
    ImageFormats.registered = true;
  }

  useEffect(() => {
    if (isEditing && foundPost?.title && foundPost?.content) {
      setPost({
        ...post,
        title: foundPost.title,
        content: foundPost.content
      });
    }
    if (!isEditing) {
      setPost({
        title: '',
        content: '',
        category: 'noCategory',
        hashtags: []
      });
    }
  }, [isEditing, foundPost]);

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
        onChange={(event) => setPost({ ...post, title: event.target.value })}
        placeholder="제목을 입력하세요."
      />
      <EditorContainer>
        <ReactQuill
          style={editorStyle}
          theme="snow"
          value={content}
          onChange={(newContent) => setPost({ ...post, content: newContent })}
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
    border: 1px solid #888;
    background: #f3f3f3;
  }
`;

const EditorContainer = styled.div`
  border-color: transparent;
  .ql-editor {
    font-size: 18px; // Set your desired default font size here
  }
`;
