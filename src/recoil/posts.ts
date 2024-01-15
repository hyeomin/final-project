import { atom } from 'recoil';
import { EDIT_INPUT } from './keys';

const titleState = atom({
  key: EDIT_INPUT.TITLE,
  default: ''
});

const contentState = atom({
  key: EDIT_INPUT.CONTENT,
  default: ''
});

const categoryState = atom({
  key: EDIT_INPUT.CATEGORY,
  default: 'noCategory'
});

const categoryListState = atom({
  key: EDIT_INPUT.CATEGORY_LIST,
  default: [
    { id: 0, nameEng: 'noCategory', nameKor: '카테고리 없음', isAdmin: false },
    { id: 1, nameEng: 'recommendation', nameKor: '제품 추천', isAdmin: false },
    { id: 2, nameEng: 'knowHow', nameKor: '노하우 공유', isAdmin: false },
    { id: 3, nameEng: 'sharing', nameKor: '제품 나눔', isAdmin: false },
    { id: 4, nameEng: 'habit', nameKor: '습관 인증', isAdmin: false },
    { id: 5, nameEng: 'adminPost', nameKor: '관리자 게시물', isAdmin: true },
    { id: 6, nameEng: 'newsRoom', nameKor: '뉴스룸', isAdmin: true }
  ]
});

const hashtagState = atom<string[]>({
  key: EDIT_INPUT.HASHTAGS,
  default: []
});

const coverImageState = atom<File[]>({
  key: EDIT_INPUT.COVER_IMAGE,
  default: []
});

const foundPostState = atom<PostType | undefined>({
  key: 'foundPost',
  default: undefined
});

export { categoryListState, categoryState, contentState, coverImageState, foundPostState, hashtagState, titleState };
