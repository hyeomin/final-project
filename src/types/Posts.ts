export interface Posts {
  category: string;

  content: string;
  coverImg: string;
  likeCount: string;
  //likeUsers
  title: string;
  uid: string;
}

export type CategoryType = {
  id: number;
  nameEng: string;
  nameKor: string;
  isAdmin: boolean;
};
