import { useRecoilValue, useRecoilState } from 'recoil';
import { toDoSelector, isDarkAtom } from '../atoms';
import styled from 'styled-components';
import ToDo from './ToDo';
import CreateToDo from './CreateToDo';
import Icon from './Icon';
import CategoryList from './CategoryList';

const Home = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const ToggleMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Container>
      <ToggleBtn onClick={ToggleMode}>
        <Icon name={isDark ? 'dark_mode' : 'wb_sunny'} />
      </ToggleBtn>
      <Category>
        <CategoryList />
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

export default Home;

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

const Category = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
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
