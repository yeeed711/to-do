import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { categoryState, toDoState } from '../atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Icon from './commen/Icon';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
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

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

  return (
    <form onSubmit={handleSubmit(handleVaild)}>
      <input
        {...register('toDo', { required: '할 일이 입력되지 않았습니다!' })}
        placeholder='해야할 일을 입력해주세요 :)'
      />
      <Button>
        <Icon name='add_circle_outline' />
      </Button>
    </form>
  );
};

export default CreateToDo;

const Button = styled.button``;
