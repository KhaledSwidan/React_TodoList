import { useState } from 'react';
import Todo from './components/Todo';
import ToDoForm from './components/ToDoForm';

const App = () =>
{
  let [todos, setTodos] = useState([]);
  const [todoShow, setTodoShow] = useState("all");
  const [toggleAllComplete, setToggleAllComplete] = useState(true);
  
  const addTodo = todo => setTodos([todo, ...todos]);
  const handleDelete = id => setTodos(todos.filter(todo => todo.id !== id));

  const updateTodoShow = s => setTodoShow(s);
  if (todoShow === "active") todos = todos.filter(e => !e.complete);
  else if (todoShow === "complete") todos = todos.filter(e => e.complete);

  const toggleComplete = id => setTodos(
    todos.map(todo =>
    {
      if (todo.id === id) {
        return {
          ...todo,
          complete: !todo.complete
        }
      } else return todo;
    }
    ));

  const removeCompletedTodo = () => setTodos(todos.filter(todo => !todo.complete));

  return (
    <div className='container'>
      <ToDoForm onSubmit={addTodo} />
      {todos.map(
        todo => <Todo
          key={todo.id}
          todo={todo}
          onDelete={() => handleDelete(todo.id)}
          toggleComplete={() => toggleComplete(todo.id)} />)}
      <div>
        <button className='update-btn btn' onClick={() => updateTodoShow("all")}>All</button>
        <button className='update-btn btn' onClick={() => updateTodoShow("active")}>Active</button>
        <button className='update-btn btn' onClick={() => updateTodoShow("complete")}>Complete</button>
      </div>
      {todos.some(todo => todo.complete) ?
        <button className='all-btn btn' onClick={removeCompletedTodo}>
          Remove all complete todos
        </button>
        : null}
      <button className='all-btn btn' onClick={() =>
      {
        setTodos(
          todos.map(todo => ({
            ...todo,
            complete: toggleAllComplete,
          })
          )
        )
        setToggleAllComplete(!toggleAllComplete)
      }
      }>Toggle all complete : {`${toggleAllComplete}`}</button>
    </div>
  );
};

export default App;
