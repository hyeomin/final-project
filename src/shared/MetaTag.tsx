import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
};
const MetaTag = ({ title, description, imageUrl }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* name 부분은 일반적인 웹페이지 설명. 검색엔젠 최적화를 위해 필요 */}
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default MetaTag;
