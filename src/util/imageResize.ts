import Resizer from 'react-image-file-resizer';

export const resizeProfileImageFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
      100,
      100
    );
  });

export const resizeCoverImageFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      3000,
      3000,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
      2000,
      2000
    );
  });
