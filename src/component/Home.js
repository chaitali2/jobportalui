import React, {Component} from 'react';
import HomeHeader from "./authentication/HomeHeader";


class Home extends Component {
    render() {
        return (
            <div>
            <HomeHeader/>
            <div>Welcome to Job Portal Management</div>
            </div>
        );
    }
}

export default Home