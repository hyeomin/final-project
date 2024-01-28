import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

function NewsUpload() {
  const [newsUrl, setNewsUrl] = useState('');

  const fetchAndParseHTML = async (url: string) => {
    try {
      // HTML 가져오기
      const response = await axios.get(url, { responseType: 'text' });
      const htmlContent = response.data;

      // HTML 파싱
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      // Cast the element to HTMLMetaElement before accessing the content property
      const metaTitleElement = doc.querySelector('meta[name="title"]') as HTMLMetaElement;
      const ogImageElement = doc.querySelector('meta[property="og:image"]') as HTMLMetaElement;

      const metaTitle = metaTitleElement?.getAttribute('content') || '';
      const ogImage = ogImageElement?.getAttribute('content') || '';

      return { metaTitle, ogImage };
    } catch (error) {
      console.error('Error fetching or parsing HTML:', error);
      return null;
    }
  };

  const handleNewsUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await fetchAndParseHTML(newsUrl);
    //console.log('뉴스데이터', data);
  };

  return (
    <Container>
      <form onSubmit={handleNewsUpload}>
        <input value={newsUrl} onChange={(e) => setNewsUrl(e.target.value)} />
        <button type="submit">뉴스 등록하기</button>
      </form>
    </Container>
  );
}

export default NewsUpload;

const Container = styled.div`
  display: flex;

  & input {
    flex: 1;
  }
`;
