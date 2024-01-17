import { User } from 'firebase/auth';
import { atom } from 'recoil';
import { USER_INFO } from './keys';

const currentUserState = atom<User | null>({
  key: USER_INFO.CURRENT_USER,
  default: null
});

const roleState = atom({
  key: USER_INFO.ROLE,
  default: ''
});

const isSignUpState = atom({
  key: USER_INFO.IS_SIGNUP,
  default: false
});

export { currentUserState, isSignUpState, roleState };
