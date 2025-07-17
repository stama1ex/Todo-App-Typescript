import type { Todo } from './components/TodoItem';

export const createNewTodo = (todo: Todo): Todo => {
  return {
    text: todo.text,
    id: todo.id,
    isComplete: false,
  };
};
