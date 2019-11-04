import React from 'react';
import SignUp from "./SignUp";
import Login from "./Login";

class Home extends React.Component {

    constructor() {
     super();
        this.state={
            showResults:false
        }
        this.onSignup = this.onSignup.bind(this);
        this.onSignIn = this.onSignIn.bind(this);

    };

    onSignup() {
        this.setState({ showResults: true })
    }

    onSignIn() {
        this.setState({ showResults: false })
    }

    render() {
        return (
            <div>

                <h1>{this.state.showResults}</h1>

            <br/>
                <button className="button"  onClick={this.onSignup}> SignUp
                </button>

                <button className="button"  onClick={this.onSignIn}> SignIn
                </button>

                {this.state.showResults ? <SignUp/>: <Login/> }

            </div>
        );
    }
}

export default Home;