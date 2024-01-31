export type YoutubeInfo = {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  description: string;
  id: string;
  liveBroadcastContent: string;
  localized: Object;
  publishedAt: string;
  tags: string[];
  thumbnails: {
    default: ThumnbnailSize;
    high: ThumnbnailSize;
    maxres: ThumnbnailSize;
    medium: ThumnbnailSize;
    standard: ThumnbnailSize;
  };
  title: string;
};

type ThumnbnailSize = {
  height: number;
  url: string;
  width: number;
};

export type NewsType = {
  id: string;
  youtubeId: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
  tags: string[];
};
