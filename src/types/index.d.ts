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
  role?: string;
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
  displayName: string;
  uid: string;
  profileImg: string;
  createdAt: number;
  content: string;
}