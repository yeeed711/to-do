import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoState } from '../atoms';
import styled from 'styled-components';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleVaild = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      {
        id: Date.now(),
        text: toDo,
        category,
      },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };

  return (
    <Form onSubmit={handleSubmit(handleVaild)} autoComplete='off'>
      <ToDoInput
        {...register('toDo', { required: '할 일이 입력되지 않았습니다!' })}
        placeholder={`${category}을 입력해 주세요 :)`}
      />
      <Button>입력</Button>
    </Form>
  );
};

const MemoizedCreateToDo = React.memo(CreateToDo);

export default MemoizedCreateToDo;

const Form = styled.form`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const ToDoInput = styled.input`
  width: 100%;
  border: 2px solid #e2e2e2;
  font-size: 1.6rem;
  padding: 0.8rem;
  border-radius: 0.8rem;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.cardColor};
  transition: border-color 0.3s;
  &:focus {
    border-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
    &::placeholder {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Button = styled.button`
  flex-shrink: 0;
  font-size: 1.6rem;
  padding: 0.4rem 1rem;
  border: 2px solid ${(props) => props.theme.accentColor};
  border-radius: 0.8rem;
  color: ${(props) => props.theme.accentColor};
  font-weight: 600;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.cardColor};
  transition: background-color 0.3s;
  &:hover {
    background-color: #e6fff5;
  }
`;
