import axios from 'axios';
import React, { useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid';

const BACKEND_BASE_URL = 'http://localhost:3001';

const getRandomDailyImage = async () => {
  const response = await axios.get(`${BACKEND_BASE_URL}/image`);

  return response.data.image;
}

const getTodos = async () => {
  const response = await axios.get(`${BACKEND_BASE_URL}/todos`);

  return response.data.todos;
}

const createTodo = async (todo) => {
  await axios.post(`${BACKEND_BASE_URL}/todos`, {todo});
}

function App() {
  const [todos, setTodos] = useState([]);
  const [image, setImage] = useState();
  const [todo, setTodo] = useState('');

  useEffect(() => {
    Promise.all([getTodos(), getRandomDailyImage()]).then((values) => {
      setImage(values[1]);
      setTodos(values[0]);
    })
  }, [todos])

  const submitTodo = async (event) => {
    event.preventDefault();
    await createTodo(todo);
    setTodo('')
    await getTodos();
  }

  return (
    <div className="App">
      <h1>Hello, world!</h1>
      <p>This is a simple React app served by an NGINX server.</p>
      {
        image && <img alt='' src={`data:image/jpeg;base64,${image}`} width='300' height='300'/>
      }
      <form onSubmit={submitTodo}>
        <input type='text' name='todo' maxLength='140' value={todo} onChange={(event) => setTodo(event.target.value)}/>
        <input type='submit' value='Create TODO'/>
      </form>
      <ul>
        {
          todos.map((todo) => <li key={uuid()}>{todo}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
