import Resizer from 'react-image-file-resizer';

export const resizeProfileImageFile = (file: File): Promise<File> =>
  new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      'JPEG',
      100,
      0,
      (uri) => {
        if (uri instanceof File) {
          resolve(uri);
        } else {
          reject(new Error('The resized image is not a File object.'));
        }
      },
      'file'
    );
  });

export const resizeCoverImageFile = (file: File): Promise<File> =>
  new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      1500,
      1500,
      'WEBP',
      100,
      0,
      (uri) => {
        if (uri instanceof File) {
          resolve(uri);
        } else {
          reject(new Error('The resized image is not a File object.'));
        }
      },
      'file'
    );
  });

export const createThumbnailImageFile = (file: File): Promise<File> =>
  new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      900,
      900,
      'WEBP',
      100,
      0,
      (uri) => {
        if (uri instanceof File) {
          resolve(uri);
        } else {
          reject(new Error('The resized image is not a File object.'));
        }
      },
      'file'
    );
  });
