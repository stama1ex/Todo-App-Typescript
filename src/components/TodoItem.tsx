import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';

export interface Todo {
  text: string;
  id: string;
  isComplete: boolean;
}

interface TodoItemProps extends Todo {
  index: number;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  text,
  index,
  deleteTodo,
  id,
  toggleComplete,
  isComplete,
}) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      onClick={() => toggleComplete(id)}
      className={`flex justify-between items-center max-w-full w-full p-2 border-b border-gray-300 dark:border-gray-600 last:border-none cursor-pointer select-none transition-colors duration-100
  ${
    isComplete
      ? 'bg-gray-300 dark:bg-gray-700 transition-colors duration-100'
      : 'odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 transition-colors duration-100'
  }`}
    >
      <div className="flex items-center gap-2 mr-8 ml-2 text-black dark:text-white transition-colors duration-100">
        <span>{++index}.</span>
      </div>

      <span
        className={`flex-1 text-center break-all ${
          isComplete
            ? 'text-gray-500 dark:text-gray-400 line-through transition-colors duration-100'
            : 'text-gray-900 dark:text-white transition-colors duration-100'
        }`}
      >
        <div className="flex justify-center gap-2">
          <span>{text}</span>
          {isComplete && <CheckCircleFilled className="text-green-600" />}
        </div>
      </span>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(id);
        }}
        className="!bg-transparent ml-6 !text-red-600 
        "
        danger
        type="link"
      >
        Delete
      </Button>
    </motion.li>
  );
};

export default TodoItem;
