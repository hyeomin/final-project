import { useEffect, useState } from 'react';
import { extractFirst50Words } from '../../util/postContentPreview';

type Props = {
  postContent: string;
};

function PostContentPreview({ postContent }: Props) {
  const [shortenedContent, setShortenedContent] = useState<string>('');

  useEffect(() => {
    // Extract the first 50 words when postContent changes
    const text = extractFirst50Words(postContent);
    setShortenedContent(text);
  }, [postContent]);

  return <span>{shortenedContent}</span>;
}

export default PostContentPreview;
