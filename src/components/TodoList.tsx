import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import type { Todo } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  className?: string;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleComplete,
}) => {
  return (
    <ul className="mt-5">
      <AnimatePresence>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            index={index}
            {...todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TodoList;
