import axios from "axios"

const TodosURL = "https://jsonplaceholder.typicode.com/todos"

const getAllTodos = async () => axios.get(TodosURL);

export default getAllTodos
