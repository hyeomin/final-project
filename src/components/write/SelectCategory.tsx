import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { postInputState } from '../../recoil/posts';
import { roleState } from '../../recoil/users';
import { categoryList } from './common/Lists';

function SelectCategory() {
  const role = useRecoilValue(roleState);

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { category } = postInput;

  // const [selectedCategoryEng, setSelectedCategoryEng] = useState(category ?? categoryList[0].nameEng);

  // Filtered category list based on role
  const filteredCategoryList = useMemo(() => {
    return role === 'user' ? categoryList.filter((category) => !category.isAdmin) : categoryList;
  }, [categoryList, role]);

  const onChangeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setPostInput({
      ...postInput,
      category: newCategory
    });
  };

  return (
    <Select value={category} onChange={onChangeSelectHandler}>
      {filteredCategoryList.map((item, idx) => {
        return (
          <option key={idx} value={item.nameEng}>
            {item.nameKor}
          </option>
        );
      })}
    </Select>
  );
}

export default SelectCategory;

const Select = styled.select`
  width: 200px;
  height: 30px;
  font-size: 16px;
  border-color: transparent;
  text-align: center;
`;
