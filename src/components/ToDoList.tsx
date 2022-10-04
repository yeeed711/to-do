import { useRecoilValue, useRecoilState } from 'recoil';
import { categoryState, Categories, toDoSelector, isDarkAtom } from '../atoms';
import styled from 'styled-components';
import ToDo from './ToDo';
import CreateToDo from './CreateToDo';
import Icon from './Icon';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const ToggleMode = () => {
    setIsDark((prev) => !prev);
  };

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
      <ToggleBtn onClick={ToggleMode}>
        <Icon name={isDark ? 'dark_mode' : 'wb_sunny'} />
      </ToggleBtn>
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
  max-width: 784px;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 3rem 3rem 10rem;
  height: 100vh;
  margin: 0 auto;
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
  position: relative;
  overflow-y: scroll;
`;

const ToggleBtn = styled.button`
  font-size: 3rem;
  border: 2px solid ${(props) => props.theme.accentColor};
  border-radius: 50%;
  padding: 9px;
  display: flex;
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  color: ${(props) => props.theme.accentColor};
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  &:hover {
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.3);
  }
`;
