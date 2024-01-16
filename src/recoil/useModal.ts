import { atom } from 'recoil';

export const publicModalState = atom({
  key: 'publicModalState',
  default: {
    isUse: false,
    title: '',
    message: '',
    btnMsg: '',
    btnType: '',
    btnMsg2: '',
    btnType2: ''
  }
});
