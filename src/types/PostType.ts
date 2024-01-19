export type PostType = {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  hashtags: string[];
  uid: string;
  role: string; //kim 추가 24.01.11
  likeCount: number;
  likedUsers: string[];
  coverImages: DownloadedImageType[] | [];

  // isLike?: boolean;
  commentCount?: number;
  viewCount?: number;
  isLiked?: boolean;
};

export type DownloadedImageType = {
  name: string;
  url: string;
};

export type EditPostStateType = {
  title: string;
  content: string;
  category: string;
  hashtags: string[] | [];
  coverImages: DownloadedImageType[] | [];
};

export type IsEditingPostProps = {
  foundPost: PostType | null;
  isEditing: boolean;
};

export type FoundDetailPostProps = {
  foundDetailPost: PostType;
};
