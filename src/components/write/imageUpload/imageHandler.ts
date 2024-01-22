import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import ReactQuill from 'react-quill';
import { storage } from '../../../shared/firebase';

const imageHandler = (quillRef: React.RefObject<ReactQuill>) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  console.log(19950811);

  input.addEventListener('change', async () => {
    if (!quillRef.current || !input.files) return;
    const editor = quillRef.current.getEditor();
    const file = input.files[0];
    const range = editor.getSelection(true);
    try {
      const storageRef = ref(storage, `image/${file.name}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          editor.insertEmbed(range.index, 'image', url);
          editor.setSelection(range.index + 1, 0);
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
};

export default imageHandler;
