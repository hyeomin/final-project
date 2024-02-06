export type UserType = {
  id: string;
  displayName: string;
  profileImg: string | null;
  role: string;
  uid: string;
};

export type User = Pick<UserType, 'displayName' | 'profileImg' | 'uid'>;
