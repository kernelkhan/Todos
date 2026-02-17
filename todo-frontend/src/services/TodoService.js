import axios from 'axios';

// IMPORTANT: If you changed your backend port to 8081, change this to 8081.
// Otherwise, keep it as 8080.
const API_URL = 'http://localhost:8080/api/todos';

export const getTodos = () => axios.get(API_URL);

export const createTodo = (todo) => axios.post(API_URL, todo);

export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);

export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);