import { atom, selector } from 'recoil';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export enum Categories {
  '해야할일' = '해야할 일',
  '진행 중' = '진행 중',
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
  default: [],
  effects: [localStorageEffect('toDo')],
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
