declare module '*.jpg';
declare module '*.png';

type User = {
  id?: string;
  password?: string;
  email?: string;
  uid?: string;
  displayName: string | null;
  profileImg: string | null;
  role?: string;
};

interface Window {
  Kakao: any;
}
