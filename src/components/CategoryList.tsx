import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoriesState, categoryState, defaultCategories } from '../atoms';
import Icon from './Icon';

const CategoryList = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const addCategory = () => {
    // setCategory();
    const newCategory = prompt('추가할 카테고리의 이름은 무엇인가요?');
    if (newCategory) {
      if (defaultCategories.includes(newCategory)) {
        alert('이미 사용중인 카테고리 이름입니다.');
        return;
      }
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
  };

  const deleteCategory = () => {
    const deletetitle = prompt('삭제할 카테고리의 이름을 적어주세요');
    if (deletetitle) {
      if (defaultCategories.includes(deletetitle)) {
        alert('기본 카테고리는 삭제할 수 없습니다.');
        return;
      }
      if (!categories.includes(deletetitle)) {
        alert('카테고리를 찾지 못했어요. 정확히 입력해주세요');
        return;
      }
      const targetIndex = categories.indexOf(deletetitle);
      console.log(targetIndex);
      setCategories((allCategories) => {
        return [
          ...allCategories.slice(0, targetIndex),
          ...allCategories.slice(targetIndex + 1),
        ];
      });
    }
  };

  const Icons = [
    <Icon name='format_list_bulleted' />,
    <Icon name='sync' />,
    <Icon name='task_alt' />,
  ];

  return (
    <>
      {categories.map((item, idx) => {
        return (
          <li key={idx}>
            <Button value={item} onClick={onClick} disabled={category === item}>
              {item}
              {Icons[idx]}
            </Button>
          </li>
        );
      })}
      <AddBtn onClick={addCategory}>카테고리 추가</AddBtn>
      <AddBtn onClick={deleteCategory}>카테고리 삭제</AddBtn>
    </>
  );
};

const MemoizedCategoryList = React.memo(CategoryList);

export default MemoizedCategoryList;

const Button = styled.button`
  width: 100%;
  color: ${(props) => props.theme.textColor};
  border-bottom: 3px solid lightgray;
  padding: 1rem;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  gap: 4px;
  transition: border-color 0.3s, color 0.3s;
  &:disabled,
  &:hover {
    border-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
  }
`;

const AddBtn = styled(Button)`
  &:hover {
    border-color: #1871f7;
    color: #1871f7;
  }
`;
