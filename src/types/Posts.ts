export interface Posts {
  category: string;

  content: string;
  coverImg: string;
  likeCount: string;
  //likeUsers
  title: string;
  uid: string;
}

export type PostType = {
  category: string;
  id: string;
  title: string;
  content: string;
  uid: null;
  hashtag: null;
  createdAt: number;
  updatedAt: number;
  likeCount: number;
  likedUsers: null;
  role: string;
};
