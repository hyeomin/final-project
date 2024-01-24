declare module '*.jpg';
declare module '*.png';

type PostTypeOutdated = {
  id: string;
  category?: string;
  title?: string;
  content?: string;
  createdAt?: number;
  updatedAt?: number;
  hashtag?: string[] | null;
  uid?: string;
  likeCount?: number;
  likedUsers?: string[];
  isLike?: boolean;
  role?: string; //kim 추가 24.01.11
  commentCount?: number;
  viewCount?: number;
  isLiked?: boolean;
};

type User = {
  id?: string;
  password?: string;
  email?: string;
  uid?: string;
  displayName: string | null;
  profileImg: string | null;
  role?: string;
};

type CommentType = {
  id: string;
  displayName: string | null;
  uid: string;
  photoURL: string | null;
  createdAt: number;
  content: string;
};

type EditingPostType = {
  category: string;
  title: string;
  content: string;
  updatedAt: number;
  hashtags: string[];
};

interface Window {
  Kakao: any;
}
