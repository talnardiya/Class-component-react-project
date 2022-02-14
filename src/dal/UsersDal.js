import axios from "axios"

const UsersURL = "https://jsonplaceholder.typicode.com/users"

const getAll = async () => await axios.get(UsersURL);

export default getAll;
