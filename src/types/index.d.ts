declare module '*.jpg';
declare module '*.png';
declare module 'react-lazy-load-image-component';

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
