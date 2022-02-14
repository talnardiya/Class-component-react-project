import getAllTodosFromDal from "../dal/TodosDal"

const utilsGetAllTodos = async () => {
    return (await getAllTodosFromDal()).data
}

export default utilsGetAllTodos;