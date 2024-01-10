export interface Posts {
  category: string;

  content: string;
  coverImg: string;
  likeCount: string;
  //likeUsers
  title: string;
  uid: string;
}

export type PostType2 = {
  category: string;
  id: string;
  title: string;
  content: string;
  uid: string;
  hashtags: string[];
  createdAt: number;
  updatedAt: number;
  likeCount: number;
  likedUsers: null;
  role: string;
};

export type CategoryType = {
  id: number;
  nameEng: string;
  nameKor: string;
  isAdmin: boolean;
};
