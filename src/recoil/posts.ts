import { atom } from 'recoil';
import { ImageItem } from '../components/write/ImageUpload';
import { POST } from './keys';

const postState = atom({
  key: POST.EDIT_INPUT,
  default: {
    title: '',
    content: '',
    category: 'noCategory',
    hashtags: ['']
  }
});

const categoryListState = atom({
  key: POST.CATEGORY_LIST,
  default: [
    { nameEng: 'noCategory', nameKor: '카테고리 없음', isAdmin: false },
    { nameEng: 'recommendation', nameKor: '제품 추천', isAdmin: false },
    { nameEng: 'knowHow', nameKor: '노하우 공유', isAdmin: false },
    { nameEng: 'sharing', nameKor: '제품 나눔', isAdmin: false },
    { nameEng: 'habit', nameKor: '습관 인증', isAdmin: false },
    { nameEng: 'adminPost', nameKor: '관리자 게시물', isAdmin: true },
    { nameEng: 'newsRoom', nameKor: '뉴스룸', isAdmin: true }
  ]
});

const coverImageState = atom<ImageItem[]>({
  key: POST.COVER_IMAGE,
  default: []
});

const isEditingPostState = atom({
  key: POST.IS_EDITING,
  default: false
});

const foundPostState = atom<PostType | undefined>({
  key: POST.FOUND_POST,
  default: undefined
});

const commonHashtagsListState = atom({
  key: POST.COMMON_HASHTAG_LIST,
  default: ['분리수거', '업사이클링', '채식', '텀블러', '건강', '에코', '탄소절감']
});

export { categoryListState, commonHashtagsListState, coverImageState, foundPostState, isEditingPostState, postState };
