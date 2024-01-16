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

export const editingTextState = atom({
  key: 'editingTextState',
  default: ''
});

export const editingCommentIdState = atom({
  key: 'editingCommentIdState',
  default: ''
});

export const buttonClickedState = atom({
  key: 'buttonClickedState',
  default: false
});
