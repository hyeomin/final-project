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
  data?: string[];
};

type User = {
  id?: string;
  name?: string;
  password?: string;
  email?: string;
  uid?: string;
  displayName?: string | null;
  profileImg?: string | null;
  role?: string;
};
