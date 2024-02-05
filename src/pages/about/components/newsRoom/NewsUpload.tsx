import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { addNews } from '../../../../api/newsApi';
import { QUERY_KEYS } from '../../../../query/keys';
import { NewsType } from '../../../../types/NewsType';

type Props = {
  newsUrl: string;
  setNewsUrl: React.Dispatch<React.SetStateAction<string>>;
};

function NewsUpload({ newsUrl, setNewsUrl }: Props) {
  // YouTube URL에서 video ID 추출
  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return null;
    }
  };

  const getVideoInfo = async (videoId: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const url = `${process.env.REACT_APP_YOUTUBE_HTTP_REQUEST}?part=snippet&id=${videoId}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const newYoutubeInfo = response.data.items[0].snippet;
      const newYoutube = { id: videoId, ...newYoutubeInfo };
      console.log('Video Info:', newYoutube);
      return newYoutube;
    } catch (erorr) {
      console.log('Error getting video', erorr);
    }
  };

  const queryClient = useQueryClient();
  const addNewsMutation = useMutation({
    mutationFn: (news: Omit<NewsType, 'id'>) => addNews(news),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NEWS] });
    },
    onError: (error) => {
      console.log('뉴스 업로드 실패', error);
    }
  });

  const handleNewsUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = extractVideoId(newsUrl);
    if (videoId) {
      const youtubeData = await getVideoInfo(videoId);
      if (youtubeData) {
        const news = {
          youtubeId: youtubeData.id,
          title: youtubeData.title,
          publishedAt: youtubeData.publishedAt,
          thumbnailUrl: youtubeData.thumbnails.standard.url,
          tags: youtubeData.tags
        };
        addNewsMutation.mutate(news);
        setNewsUrl('');
      }
    }
  };

  return (
    <form onSubmit={handleNewsUpload}>
      <input value={newsUrl} onChange={(e) => setNewsUrl(e.target.value)} />
      <button type="submit">뉴스 등록하기</button>
    </form>
  );
}

export default NewsUpload;
