declare module "*.jpg";
declare module "*.png";


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
    profileImg?: string | null
    coverUrl?:string | null
  };