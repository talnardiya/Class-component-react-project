import React, { Component } from 'react';

class UserAddress extends Component {

 // I didn't use here a useless constructor because it doesn't accomplish anything.
  
    render() {
        return (
            <div>
                Street: <input type="text" name="street" value={this.props.street} style={{ width: "150px" }} onChange={(e) => this.props.ChangeUserAddress(e)} /> <br />
                City: <input type="text" name="city" value={this.props.city} style={{ width: "150px" }} onChange={(e) => this.props.ChangeUserAddress(e)} /> <br />
                Zipcode: <input type="text" name="zipcode" value={this.props.zipcode} style={{ width: "150px" }} onChange={(e) => this.props.ChangeUserAddress(e)} /> <br />

            </div>
        );
    }
}

export default UserAddress;