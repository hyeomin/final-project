import { atom } from 'recoil';
import { ImageItem } from '../components/write/ImageUploadTest';
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
    { id: 0, nameEng: 'noCategory', nameKor: '카테고리 없음', isAdmin: false },
    { id: 1, nameEng: 'recommendation', nameKor: '제품 추천', isAdmin: false },
    { id: 2, nameEng: 'knowHow', nameKor: '노하우 공유', isAdmin: false },
    { id: 3, nameEng: 'sharing', nameKor: '제품 나눔', isAdmin: false },
    { id: 4, nameEng: 'habit', nameKor: '습관 인증', isAdmin: false },
    { id: 5, nameEng: 'adminPost', nameKor: '관리자 게시물', isAdmin: true },
    { id: 6, nameEng: 'newsRoom', nameKor: '뉴스룸', isAdmin: true }
  ]
});

const coverImageState = atom<ImageItem[]>({
  key: POST.COVER_IMAGE,
  default: []
});

const isEditingState = atom({
  key: POST.IS_EDITING,
  default: false
});

const foundPostState = atom<PostType | undefined>({
  key: POST.FOUND_POST,
  default: undefined
});

export { categoryListState, coverImageState, foundPostState, isEditingState, postState };
