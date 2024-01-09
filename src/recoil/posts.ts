import { atom } from 'recoil';
import {
  EDIT_COVER_IMAGE,
  EDIT_INPUT_CATEGORY,
  EDIT_INPUT_CATEGORY_LIST,
  EDIT_INPUT_CONTENT,
  EDIT_INPUT_HASTAG,
  EDIT_INPUT_TITLE
} from './keys';

const titleState = atom({
  key: EDIT_INPUT_TITLE,
  default: ''
});

const contentState = atom({
  key: EDIT_INPUT_CONTENT,
  default: ''
});

const categoryState = atom({
  key: EDIT_INPUT_CATEGORY,
  default: ''
});

const categoryListState = atom({
  key: EDIT_INPUT_CATEGORY_LIST,
  default: [
    { id: 0, name: '카테고리 없음', isAdmin: false },
    { id: 1, name: '제품 추천', isAdmin: false },
    { id: 2, name: '노하우 공유', isAdmin: false },
    { id: 3, name: '물품 나눔', isAdmin: false },
    { id: 4, name: '관리자 게시물', isAdmin: true },
    { id: 5, name: '뉴스룸', isAdmin: true }
  ]
});

const hashtagState = atom<string[]>({
  key: EDIT_INPUT_HASTAG,
  default: []
});

const coverImageState = atom<File[]>({
  key: EDIT_COVER_IMAGE,
  default: []
});

export { categoryListState, categoryState, contentState, coverImageState, hashtagState, titleState };
