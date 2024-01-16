import { atom } from 'recoil';

export const publicModal = atom({
  key: 'PublicModal',
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
