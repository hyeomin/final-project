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
  default: 'noCategory'
});

const categoryListState = atom({
  key: EDIT_INPUT_CATEGORY_LIST,
  default: [
    { id: 0, nameEng: 'noCategory', nameKor: '카테고리 없음', isAdmin: false },
    { id: 1, nameEng: 'recommendation', nameKor: '제품 추천', isAdmin: false },
    { id: 2, nameEng: 'knowHow', nameKor: '노하우 공유', isAdmin: false },
    { id: 3, nameEng: 'sharing', nameKor: '물품 나눔', isAdmin: false },
    { id: 4, nameEng: 'habit', nameKor: '습관 기록', isAdmin: false },
    { id: 5, nameEng: 'adminPost', nameKor: '관리자 게시물', isAdmin: true },
    { id: 6, nameEng: 'newsRoom', nameKor: '뉴스룸', isAdmin: true }
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
