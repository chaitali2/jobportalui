import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from "axios";

// import './Login.css';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    login() {
        axios.post("http://10.234.4.106:8080/authentication/login", this.state).then(response => {
            let responseJSON = JSON.stringify(response);
            console.log("response==" + responseJSON);

            if (response.data) {
                sessionStorage.setItem('userData', JSON.stringify(response));
                this.setState({redirectToReferrer: true});
            }
            // this.setState({posts: response.data})
        }).catch(error => {
            console.log(error)
        })

    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {

        const {username, password} = this.state

        // alert(this.state.redirectToReferrer + "===" + sessionStorage.getItem('userData'));
        if (this.state.redirectToReferrer || sessionStorage.getItem("userData")) {
            return (<Redirect to={'/portal'}/>);
        }
        return (
            <div className="row" id="Body">
                <div className="medium-5 columns left">
                    <h4>Login</h4>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.onChange}/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.onChange}/>
                    <input type="submit" value="Login" onClick={this.login}/>
                    <Link activeStyle={{color: 'green'}} to={"/registration"}>Registrartion</Link>
                </div>
            </div>
        );
    }
}

export default Login