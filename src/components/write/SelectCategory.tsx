import { useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryListState, categoryState } from '../../recoil/posts';
import { roleState } from '../../recoil/users';

function SelectCategory() {
  const [displayCategory, setDisplayCategory] = useState('');

  const [category, setCategory] = useRecoilState(categoryState);

  const role = useRecoilValue(roleState);
  const categoryList = useRecoilValue(categoryListState);

  // 유저인 경우와 어드민 경우 구분 필요
  const filteredCategoryList = useMemo(() => {
    if (role === 'user') {
      return categoryList.filter((category) => !category.isAdmin);
    }
    return categoryList;
  }, [categoryList, role]);

  // category 선택 핸들러
  const onChangeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNameKor = event.target.value;
    setDisplayCategory(selectedNameKor);

    const selectedName = filteredCategoryList.find((category) => category.nameKor === selectedNameKor);
    setCategory(selectedName ? selectedName.nameEng : categoryList[0].nameEng);
  };

  return (
    <select value={displayCategory} onChange={onChangeSelectHandler}>
      <option value="" disabled hidden>
        카테고리
      </option>
      {filteredCategoryList.map((item) => {
        return <option key={item.id}>{item.nameKor}</option>;
      })}
    </select>
  );
}

export default SelectCategory;
