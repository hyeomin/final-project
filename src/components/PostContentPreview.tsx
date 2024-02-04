import { useEffect, useState } from 'react';
import { stripHtml } from '../util/extractContentText';

type Props = {
  postContent: string;
};

function PostContentPreview({ postContent }: Props) {
  const [shortenedContent, setShortenedContent] = useState<string>('');

  useEffect(() => {
    // const text = extractFirst50Words(postContent);
    // setShortenedContent(text);
    const text = stripHtml(postContent).trim();
    setShortenedContent(text);
  }, [postContent]);

  return <span>{shortenedContent}</span>;
}

export default PostContentPreview;
