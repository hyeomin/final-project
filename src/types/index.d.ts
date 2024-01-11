declare module '*.jpg';
declare module '*.png';

type PostType = {
  id?: string;
  category?: string;
  title?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  hashtag?: null;
  uid?: string;
  likeCount?: number;
  likedUsers?: string[];
  isLike?: boolean;
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

type Comment = {
  id: string;
  uid: string;
  profileImg: string;
  createdAt: string;
}