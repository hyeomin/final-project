import axios from 'axios';
import ReactQuill from 'react-quill';

const imageHandler = (quillRef: React.RefObject<ReactQuill>) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.addEventListener('change', async () => {
    if (!quillRef.current || !input.files) return;
    const editor = quillRef.current.getEditor();
    const file = input.files[0];
    const range = editor.getSelection(true);

    // FormData to hold the file and upload preset for Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'azkon89a');

    // Cloudinary upload URL
    const uploadUrl = 'https://api.cloudinary.com/v1_1/docemcnec/image/upload';

    try {
      // Use axios for the upload to Cloudinary
      const response = await axios.post(uploadUrl, formData);
      const data = await response.data;

      // Insert the uploaded image URL into the editor
      editor.insertEmbed(range.index, 'image', data.url);
      editor.setSelection(range.index + 1, 0);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  });
};

export default imageHandler;
