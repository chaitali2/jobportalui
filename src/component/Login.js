import React from 'react';
class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }
    };
    render() {
        return (
            <div>
                <div id="login">
                <form method="post" name={"loginform"} >
                    <label>User Name :</label>
                    <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.username}</div>

                    <label>Password :</label>
                    <input type="text" name="password" value={this.state.fields.password} onChange={this.handleChange}  />
                    <div className="errorMsg">{this.state.errors.password}</div>
                </form>
                </div>
            </div>
        );
    }
}


export default Login;