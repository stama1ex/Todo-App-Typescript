import { CheckCircleFilled } from '@ant-design/icons';
import {
  Input as AntdInput,
  Progress as AntdProgress,
  Button as AntdButton,
} from 'antd';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';
import type { Todo } from './components/TodoItem';
import { v4 as uuidv4 } from 'uuid';
import { createNewTodo } from './utils';
import ThemeToggleButton from './UI/ThemeToggleButton';

const { Search } = AntdInput;

const MAX_TODO_LENGTH = 200;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTodo = (input: string) => {
    if (input.trim() && input.length <= MAX_TODO_LENGTH) {
      input = input.trim();
      setQuery('');
      setTodos([
        ...todos,
        createNewTodo({
          text: input,
          id: uuidv4(),
          isComplete: false,
        }),
      ]);
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => id !== todo.id));
  };
  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };
  const clearComplete = () => {
    setTodos(todos.filter((todo) => todo.isComplete === false));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const completedQty = todos.filter((todo) => todo.isComplete === true).length;
  const allTodosCompleted = todos.length === completedQty;

  return (
    <div className="min-h-screen flex items-center justify-center my-4 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500">
      <ThemeToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex flex-col items-center w-full max-w-[600px] px-4 py-8 mx-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-2xl transition-colors duration-100">
        <h1 className="text-5xl font-bold mb-8">Todo App</h1>
        <Search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter new todo"
          enterButton="Add Todo"
          size="large"
          onSearch={() => addTodo(query)}
          count={{
            show: true,
            max: MAX_TODO_LENGTH,
          }}
          maxLength={MAX_TODO_LENGTH}
          status={
            query.length === 200
              ? 'error'
              : query.length > 180
                ? 'warning'
                : undefined
          }
          className="dark:bg-gray-800 bg-white transition-colors duration-100"
        />

        {todos.length > 0 ? (
          <>
            <AntdProgress
              percent={Math.floor((completedQty * 100) / todos.length)}
              format={(percent) =>
                percent === 100 ? (
                  <CheckCircleFilled style={{ color: 'green' }} />
                ) : (
                  completedQty > 0 && (
                    <span
                      style={{
                        color: darkMode ? 'white' : 'black',
                        transition: 'color 0.2s',
                      }}
                    >
                      {percent}%
                    </span>
                  )
                )
              }
            />

            <h2 className="mb-4">
              {allTodosCompleted ? (
                "You've completed all the todos!"
              ) : (
                <span>
                  Completed:{' '}
                  <strong>
                    {completedQty}/{todos.length}
                  </strong>
                </span>
              )}
            </h2>
            <div className="flex gap-4">
              <AntdButton
                className={`
    transition-colors duration-100
    ${allTodosCompleted ? '!bg-green-600  !border-green-600' : ''}
    ${!allTodosCompleted && completedQty === 0 ? '!text-gray-400 !border-gray-400' : ''}
    ${!allTodosCompleted && completedQty > 0 ? 'dark:!text-white' : ''}
  `}
                disabled={completedQty === 0}
                onClick={clearComplete}
                type="primary"
                danger={false}
              >
                Clear Complete
              </AntdButton>
              <AntdButton
                className="!bg-transparent !text-black dark:!text-white transition-colors duration-100"
                danger
                onClick={clearAll}
              >
                Clear All
              </AntdButton>
            </div>
            <div className="text-center w-full">
              <TodoList
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                todos={todos}
              />
            </div>
          </>
        ) : (
          <div className="my-4">
            <h1 className="text-2xl text-black/20 dark:text-white/20 transition-colors duration-100">
              No todos yet
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
