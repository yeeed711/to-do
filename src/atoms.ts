import { atom, selector } from 'recoil';

export enum Categories {
  '해야할일' = '해야할일',
  '하는중' = '하는중',
  '완료됨' = '완료됨',
}
export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: JSON.parse(localStorage.getItem('toDos') ?? '[]'),
});

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.해야할일,
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
