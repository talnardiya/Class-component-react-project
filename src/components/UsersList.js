import React, { Component } from 'react';
import getAllUsers from "../utils/UserUtils"
import getAllTodos from "../utils/TodosUtils"
import getAllPosts from "../utils/PostsUtils"
import UserComp from './UserComp';
import TodosList from './TodosList';
import PostsList from './PostsList';
import UserContext from "../utils/userContext"
import NewUser from './NewUser';

class UsersList extends Component {
    constructor() {
        super()
        this.state = {
            users: [], todos: [], posts: [],
            searchInput: "", usersToDisplay: [], id: '', showAddUser: false
        }
    }
    // Loading the data of the users,todos,posts. 
    componentDidMount = async () => {
        const users = await getAllUsers();
        const todos = await getAllTodos();
        const posts = await getAllPosts();

        this.setState({ users, todos, posts, usersToDisplay: users })
    }
    // This function is checking if the todo of the user is completed.
    isTodoCompleted = (id) => {
        const found = this.state.todos.find(todo => (todo.userId === id && todo.completed === false));
        if (found) {
            return false;
        } else {
            return true;
        }
    }
    // This function is getting an id and user, it is finds the index of the user and updates his state.
    // I am using here searchUsers function so it will refresh the users to display.
    updateUser = (id, user) => {
        let indexToUpdate = this.state.users.findIndex(user => user.id === id);

        let tempUsers = [...this.state.users];
        tempUsers[indexToUpdate] = user;
        this.setState({ users: tempUsers }, () => this.searchUsers())
    }
    // This function is getting an id, it deletes the user from the state.
    deleteUser = (id) => {
        let indexToDelete = this.state.users.findIndex(user => user.id === id);

        let tempUsers = [...this.state.users]
        tempUsers.splice(indexToDelete, 1)
        let filteredTodos = this.state.todos.filter(todo => todo.userId !== id)
        let filteredPosts = this.state.posts.filter(post => post.userId !== id)

        this.setState({ posts: filteredPosts, todos: filteredTodos, users: tempUsers }, () => this.searchUsers())

    }

    // This function is checking if the user name and email characters in the search text box are matching to the users list.
    searchUsers = () => {
        let searchTxt = this.state.searchInput;

        let filteredUsers = this.state.users.filter(user => user.name.toLowerCase().includes(searchTxt.toLowerCase()) || user.email.toLowerCase().includes(searchTxt.toLowerCase()))
        this.setState({ usersToDisplay: filteredUsers })
    }
    // This function is updating the state of the ID that the client is clicking on.
    idOnClick = (id) => {
        if (id === this.state.id) {
            this.setState({ id: "" })
        } else {
            this.setState({ id })
        }
    }
    // This function is returning filtered Todos of the specific user by id.
    getUsersTodos = (id) => {
        let filteredTodos = this.state.todos.filter(todo => todo.userId === id)
        return filteredTodos;
    }
    // This function is returning filtered Posts of the specific user by id.
    getUsersPosts = (id) => {
        let filteredPosts = this.state.posts.filter(post => post.userId === id)
        return filteredPosts
    }
    // This function is changing the todo state from false to true. 
    completeTodo = (todoId) => {
        let tempTodos = [...this.state.todos];
        let index = tempTodos.findIndex(todo => todo.id === todoId)
        tempTodos[index].completed = true;
        this.setState({ todos: tempTodos });
    }
    // This function is adding an new todo to specific user.
    addTodo = (userId, title) => {
        let newTodo = {
            userId, title,
            completed: false,
            id: this.state.todos.at(-1).id + 1
        }
        this.setState(prevState => ({ todos: [...prevState.todos, newTodo] }))
    }
    // This function is adding a new post to specific user.
    addPost = (userId, title, body) => {
        let newPost = {
            userId, title, body,

            id: this.state.posts.at(-1).id + 1
        }
        this.setState(prevState => ({ posts: [...prevState.posts, newPost] }))
    }
    // this function is adding a new user to users state.
    addUser = (name, email) => {
        let newUser = {
            name, email,
            id: this.state.users.at(-1).id + 1,
            address: { city: "", street: "", zipcode: "" }
        }
        this.setState(prevState => ({ users: [...prevState.users, newUser] }), () => this.searchUsers())
    }
    // This function is hiding the NewUser component.
    hideAddUser = () => {
        this.setState({ showAddUser: false })
    }



    render() {
         // I am using UserContext in order to send functions to grand childs of UsersList component.
        return (<UserContext.Provider value={{ completeTodo: this.completeTodo, addTodo: this.addTodo, addPost: this.addPost }}> 
            <div style={{ display: "inline-block" }}>
                <input type="search" name="site-search" value={this.state.searchInput} onChange={(e) => {
                    this.setState({ searchInput: e.target.value }, () => {
                        this.searchUsers()
                    })
                }} />

                <button onClick={() => this.setState({ showAddUser: true })}>Add</button>

                {this.state.usersToDisplay.map((user, index) => {
                    return <UserComp key={index}
                        selected={user.id === this.state.id}
                        user={user}
                        updateUser={this.updateUser}
                        deleteUser={this.deleteUser}
                        isTodoCompleted={this.isTodoCompleted}
                        idOnClick={this.idOnClick}

                    />
                })}

                {/* I am deciding here if to present  the NewUser component and the other component in here or not rendering them. */}
                {this.state.showAddUser ? <NewUser hideAddUser={this.hideAddUser} addUser={this.addUser} />
                    : <div>
                        {this.state.id !== "" ? <TodosList id={this.state.id} getUsersTodos={this.getUsersTodos} /> : null}
                        {this.state.id !== "" ? <PostsList id={this.state.id} getUsersPosts={this.getUsersPosts} /> : null}
                    </div>}
            </div>
        </UserContext.Provider>
        );
    }
}

export default UsersList;