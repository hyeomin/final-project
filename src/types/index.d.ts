declare module '*.jpg';
declare module '*.png';

type PostType = {
  id: string;
  category?: string;
  title?: string;
  content?: string;
  createdAt?: number;
  updatedAt?: number;
  hashtag?: null;
  uid?: string;
  likeCount?: number;
  likedUsers?: string[];
  isLike?: boolean;
  role?: string; //kim 추가 24.01.11
  commentCount?: number;
  viewCount?: number;
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
