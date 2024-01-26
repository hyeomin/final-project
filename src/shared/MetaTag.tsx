import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  image: string;
  url: string;
};
const MetaTag = ({ title, description, image, url }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* name 부분은 일반적인 웹페이지 설명. 검색엔젠 최적화를 위해 필요 */}
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default MetaTag;
