import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryState, Categories } from '../atoms';
import Icon from './Icon';

const CategoryList = () => {
  const [category, setCategory] = useRecoilState(categoryState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const Icons = {
    '해야할 일': <Icon name='format_list_bulleted' />,
    '진행 중': <Icon name='sync' />,
    완료됨: <Icon name='task_alt' />,
  };

  return (
    <>
      {Object.values(Categories).map((item, idx) => {
        return (
          <li key={idx}>
            <Button value={item} onClick={onClick} disabled={category === item}>
              {item}
              {Icons[item]}
            </Button>
          </li>
        );
      })}
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
