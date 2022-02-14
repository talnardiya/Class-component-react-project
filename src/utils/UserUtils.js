import getAllUsersFromDal from "../dal/UsersDal"


const utilsGetAllUsers = async () => {
    let usersData = (await getAllUsersFromDal()).data;
    let mappedUsers = mapUserLists(usersData);
    return mappedUsers;
}


// This function is doing data shaping to the users from the API.
const mapUserLists = (users) => {
    let mappedUsers = users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            address: {
                city: user.address.city, street: user.address.street, zipcode: user.address.zipcode
            }
        }
    })
    return mappedUsers;
}

export default utilsGetAllUsers