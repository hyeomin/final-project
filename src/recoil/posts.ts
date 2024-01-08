import { atom } from 'recoil';

const categoryRecoilState = atom({
  key: 'categoryState',
  default: [
    { id: 0, name: '카테고리 없음', isAdmin: false },
    { id: 1, name: '제품 추천', isAdmin: false },
    { id: 2, name: '노하우 공유', isAdmin: false },
    { id: 3, name: '물품 나눔', isAdmin: false },
    { id: 4, name: '관리자 게시물', isAdmin: true },
    { id: 5, name: '뉴스룸', isAdmin: true }
  ]
});

export { categoryRecoilState };
