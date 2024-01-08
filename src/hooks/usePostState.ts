import { useState } from 'react';

export default function usePostState() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [imageList, setImageList] = useState<File[]>([]);

  return { category, setCategory, title, setTitle, content, setContent, hashtag, setHashtag, imageList, setImageList };
}
