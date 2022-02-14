import getAllPostsFromDal from "../dal/PostsDal"


const utilsGetAllPosts = async () => {
    return (await getAllPostsFromDal()).data
}


export default utilsGetAllPosts