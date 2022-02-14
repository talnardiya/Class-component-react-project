import axios from "axios"

const PostsURL = "https://jsonplaceholder.typicode.com/posts"

const getAllPosts = async () => axios.get(PostsURL);

export default getAllPosts
