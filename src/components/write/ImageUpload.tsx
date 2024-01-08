import React from 'react';

type Props = {
  imageList: File[];
  setImageList: React.Dispatch<React.SetStateAction<File[]>>;
};

function ImageUpload({ imageList, setImageList }: Props) {
  const onAddImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;

    if (selectedImages) {
      const filesArray = Array.from(selectedImages);
      const updatedImageList = [...imageList, ...filesArray];
      setImageList(updatedImageList);
    }
  };

  const onDeletePreview = (id: number) => {
    const listAfterDelete = imageList.filter((_, index) => index !== id);
    setImageList(listAfterDelete);
  };

  return (
    <div>
      <input type="file" multiple onChange={onAddImageHandler} />
      <section>
        {imageList.map((file, id) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <div key={id}>
              <img src={imageUrl} alt={`${file.name}-${id}`} />
              <button onClick={() => onDeletePreview(id)}>삭제</button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default ImageUpload;
