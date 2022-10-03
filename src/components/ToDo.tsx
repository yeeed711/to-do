import React from 'react';
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

  return (
    <li>
      {text}
      {category !== Categories.해야할일 && (
        <button
          style={{ marginRight: '10px' }}
          name={Categories.해야할일}
          onClick={onClick}>
          해야할일
        </button>
      )}
      {category !== Categories.하는중 && (
        <button
          style={{ marginRight: '10px' }}
          name={Categories.하는중}
          onClick={onClick}>
          하는중
        </button>
      )}
      {category !== Categories.완료됨 && (
        <button
          style={{ marginRight: '10px' }}
          name={Categories.완료됨}
          onClick={onClick}>
          완료됨
        </button>
      )}
    </li>
  );
};

export default ToDo;
