export type PostType = {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  hashtags: string[];
  uid: string;
  role: string;
  likeCount: number;
  likedUsers: string[];
  coverImages: DownloadedImageType[];
  comments?: [];
  commentCount?: number;
  viewCount?: number;
  isLiked?: boolean;
};

export type DownloadedImageType = {
  name: string;
  url: string;
  thumbnailUrl: string | null;
  isLocal?: boolean;
};

export type PostInputType = {
  title: string;
  content: string;
  category: string;
  hashtags: string[];
  coverImages: DownloadedImageType[];
};

export type IsEditingPostProps = {
  foundPost: PostType | null;
  isEditing: boolean;
};

export type FoundDetailPostProps = {
  foundDetailPost: PostType;
  isLoading?: boolean;
};

export type CommentType = {
  id: string;
  displayName: string | null;
  uid: string;
  photoURL: string | null;
  createdAt: number;
  content: string;
};
