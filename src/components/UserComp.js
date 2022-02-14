import { Component } from "react";
import UserAddress from "./UserAddress";


export default class UserComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            showOtherData: false

        }
    }

    // This function is changing the state if the props has been changed.
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ user: this.props.user })
        }
    }
    // This function is setting the address state of the user.
    setAddressState = (e) => {
        let { name, value } = e.target;
        let tempUser = { ...this.state.user };
        tempUser.address[name] = value;
        this.setState({ user: tempUser });
    }
    // This function  is setting the name and the email of the user.
    setBasicUserDataState = (e) => {
        let { name, value } = e.target;
        let tempUser = { ...this.state.user };
        tempUser[name] = value;
        this.setState({ user: tempUser });
    }


    render() {
        // I am calling a function that checks if the todo is completed and according to this it sets the color to green or red.
        let color = this.props.isTodoCompleted(this.state.user.id) ? "green" : "red"; 
        return (<div style={{ border: "1px solid " + color, backgroundColor: this.props.selected ? "orange" : "white" }}>
            <form onSubmit={(e) => e.preventDefault()}>
                <span onClick={() => this.props.idOnClick(this.state.user.id)}>ID:{this.props.user.id}</span> <br />
                Name: <input type="text" name="name" value={this.state.user.name} style={{ width: "150px" }} onChange={this.setBasicUserDataState} /> <br />
                Email:<input type="email" name="email" value={this.state.user.email} style={{ width: "150px" }} onChange={this.setBasicUserDataState} /> <br />
                {/* I am setting the state of showOtherData to true in order to display other data onMouseOver, when i click on mouse over the state will change to false and showOtherData will dissappear  */}
                <button onMouseOver={() => this.setState({ showOtherData: true })} onClick={() => this.setState({ showOtherData: false })}>Other Data</button>

                {/* I am sending all this functions to UsersList */}
                <button onClick={() => this.props.updateUser(this.state.user.id, this.state.user)}>Update</button>
                <button onClick={() => this.props.deleteUser(this.state.user.id)}>Delete</button>


                {/* I am chosing if to show other data or not */}
                {this.state.showOtherData ? <UserAddress ChangeUserAddress={this.setAddressState} city={this.state.user.address.city} street={this.state.user.address.street} zipcode={this.state.user.address.zipcode} /> : null}
            </form>
        </div>)
    }
}