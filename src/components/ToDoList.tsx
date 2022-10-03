import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, Categories, toDoSelector } from '../atoms';
import ToDo from './ToDo';
import CreateToDo from './CreateToDo';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const setCategory = useSetRecoilState(categoryState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>TODO</h1>
      <ul>
        <li>
          <button onClick={onClick} value={Categories.해야할일}>
            해야할 일
          </button>
        </li>
        <li>
          <button onClick={onClick} value={Categories.하는중}>
            하는중
          </button>
        </li>
        <li>
          <button onClick={onClick} value={Categories.완료됨}>
            완료됨
          </button>
        </li>
      </ul>
      <CreateToDo />
      <ul style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
