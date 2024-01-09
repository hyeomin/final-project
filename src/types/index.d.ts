declare module '*.jpg';
declare module '*.png';

//test
type Post = {
  id?: string;
  title?: string;
  content?: string;
  category?: string;
  role?: string;
  uid?: string;
  createdAt?: number;
  likeCount?: number;
  role?: string;
  profileImg?: string | null;
  coverUrl?: string | null;
};

export type PostType = {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  hashtag: null;
  uid: null;
  likeCount: number;
  likedUsers: null;
};
