import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { categoryState, Categories, toDoSelector } from '../atoms';
import ToDo from './ToDo';
import CreateToDo from './CreateToDo';
import Icon from './commen/Icon';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
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
    <Container>
      <Title>TO DO</Title>
      <Category>
        {Object.values(Categories).map((item, idx) => {
          return (
            <li key={idx}>
              <button
                value={item}
                onClick={onClick}
                disabled={category === item}>
                {item}
                {Icons[item]}
              </button>
            </li>
          );
        })}

        {/*      {Object.values(Categories).map((item, idx) => {
          switch (item) {
            case '해야할 일':
              return (
                <li key={idx}>
                  <button
                    value={item}
                    onClick={onClick}
                    disabled={category === item}>
                    {item}
                    <Icon name='format_list_bulleted' />
                  </button>
                </li>
              );
            case '진행 중':
              return (
                <li key={idx}>
                  <button
                    value={item}
                    onClick={onClick}
                    disabled={category === item}>
                    {item}
                    <Icon name='sync' />
                  </button>
                </li>
              );
            case '완료됨':
              return (
                <li key={idx}>
                  <button
                    value={item}
                    onClick={onClick}
                    disabled={category === item}>
                    {item}
                    <Icon name='task_alt' />
                  </button>
                </li>
              );
          }
        })} */}
      </Category>
      <CreateToDo />
      <ToDoItems>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoItems>
    </Container>
  );
};

export default ToDoList;

const Container = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10rem auto;
  gap: 3rem;
  padding: 3rem;
`;

const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  color: ${(props) => props.theme.accentColor};
`;

const Category = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  & button {
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
  }
`;

const ToDoItems = styled.ul`
  border-radius: 1rem;
  width: 100%;
`;
