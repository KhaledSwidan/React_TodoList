import { React, useState } from 'react';
import shortid from 'shortid';

import "./todo.css";

const ToDoForm = (props) =>
{
  const [text, setText] = useState("");
  const handleSubmit = e =>
  {
    e.preventDefault();
    props.onSubmit({
      id: shortid.generate(),
      todoTxt: text,
      complete: false
    });
    setText("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          onChange={e => setText(e.target.value)}
          value={text} />
        <button className='btn' onSubmit={handleSubmit}>
          Add ToDo
        </button>
      </form>
    </>
  );
};

export default ToDoForm