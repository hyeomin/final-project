import { atom } from 'recoil';
import { USER_INFO } from './keys';

const roleState = atom({
  key: USER_INFO.ROLE,
  default: ''
});

const isSignUpState = atom({
  key: USER_INFO.IS_SIGNUP,
  default: false
});

export { isSignUpState, roleState };
