import { CloseOutlined } from "@ant-design/icons";
import { a, useTransition } from "@react-spring/web";
import { Radio } from "antd";
import { FormEvent } from "react";
import { create } from "zustand";

type FilterType = "all" | "completed" | "incompleted";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Store = {
  todos: Array<Todo>;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  setTodos: (fn: (todos: Array<Todo>) => Array<Todo>) => void;
};

let keyCount = 0;

const useStore = create<Store>((set) => ({
  todos: [],
  filter: "all",
  setFilter(filter) {
    set({ filter });
  },
  setTodos(fn) {
    set((prev) => ({ todos: fn(prev.todos) }));
  },
}));

const Filter = () => {
  const { filter, setFilter } = useStore();
  return (
    <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="completed">Completed</Radio.Button>
      <Radio.Button value="incompleted">Incompleted</Radio.Button>
    </Radio.Group>
  );
};

const TodoItem = ({ item }: { item: Todo }) => {
  const { setTodos } = useStore();
  const { title, completed, id } = item;

  const toggleCompleted = () =>
    setTodos((prevTodos) =>
      prevTodos.map((prevItem) =>
        prevItem.id === id ? { ...prevItem, completed: !completed } : prevItem,
      ),
    );

  const remove = () => {
    setTodos((prevTodos) => prevTodos.filter((prevItem) => prevItem.id !== id));
  };

  return (
    <>
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      <span style={{ textDecoration: completed ? "line-through" : "" }}>
        {title}
      </span>
      <CloseOutlined onClick={remove} />
    </>
  );
};

const Filtered = () => {
  const { todos, filter } = useStore();
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incompleted") return !todo.completed;
    return true;
  });

  const transitions = useTransition(filteredTodos, {
    keys: (todo) => todo.id,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
  });

  return transitions((styles, item) => (
    <a.div style={styles} className="item">
      <TodoItem item={item} />
    </a.div>
  ));
};

const App = () => {
  const { setTodos } = useStore();
  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value;
    e.currentTarget.inputTitle.value = "";
    setTodos((prevTodos) => [
      ...prevTodos,
      { title, completed: false, id: keyCount++ },
    ]);
  };

  return (
    <form onSubmit={add}>
      <Filter />
      <input name="inputTitle" placeholder="Type ..." />
      <Filtered />
    </form>
  );
};

export default App;
