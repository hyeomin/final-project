export const commonHashtagsList = ['분리수거', '업사이클링', '채식', '텀블러', '건강', '에코', '탄소절감'];

export const categoryList = [
  { nameEng: 'noCategory', nameKor: '카테고리 없음', isAdmin: false },
  { nameEng: 'recommendation', nameKor: '제품 추천', isAdmin: false },
  { nameEng: 'knowHow', nameKor: '노하우 공유', isAdmin: false },
  { nameEng: 'sharing', nameKor: '제품 나눔', isAdmin: false },
  { nameEng: 'habit', nameKor: '습관 인증', isAdmin: false },
  { nameEng: 'adminPost', nameKor: 'Original Contents by Mango', isAdmin: true },
  { nameEng: 'newsRoom', nameKor: '뉴스룸', isAdmin: true }
];

export const convertToKor = (categoryEng: string) => {
  return categoryList.find((c) => c.nameEng === categoryEng)?.nameKor;
};
