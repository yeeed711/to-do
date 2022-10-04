import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { toDoState, Categories, IToDo } from '../atoms';

const ToDo = ({ id, text, category }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { id, text, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠어요?')) {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
  };

  return (
    <Li>
      {text}
      <ButtonWrapper>
        {category !== Categories.해야할일 && (
          <DoBtn name={Categories.해야할일} onClick={onClick}>
            해야할 일
          </DoBtn>
        )}
        {category !== Categories.하는중 && (
          <DoingBtn name={Categories.하는중} onClick={onClick}>
            진행 중
          </DoingBtn>
        )}
        {category !== Categories.완료됨 && (
          <DoneBtn name={Categories.완료됨} onClick={onClick}>
            완료됨
          </DoneBtn>
        )}
        <DelBtn onClick={handleDelete}>삭제</DelBtn>
      </ButtonWrapper>
    </Li>
  );
};

export default ToDo;

const Li = styled.li`
  padding: 1.5rem 2rem 0 2rem;
  border-radius: 8px;
  margin-bottom: 1.8rem;
  font-size: 1.6rem;
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: ${(props) => props.theme.cardColor};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin: 1.5rem 0;
  gap: 1rem;
  & button {
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0.6rem;
    padding: 0.3rem 0.6rem;
    font-weight: 600;
  }
`;

const DoBtn = styled.button`
  color: grey;
  transition: color 0.3s;
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

const DoingBtn = styled(DoBtn)``;
const DoneBtn = styled(DoBtn)``;

const DelBtn = styled.button`
  color: ${(props) => props.theme.redColor};
  border: 2px solid transparent;
  background-color: ${(props) => props.theme.redBgColor};
  transition: border 0.3s;
  &:hover {
    border: 2px solid ${(props) => props.theme.redColor};
  }
`;
