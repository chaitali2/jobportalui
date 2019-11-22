import React from 'react';
import './css/Style.css';
import Login from "./component/Login";
import Home from "./component/Home";
import HomeHeader from "./component/HomeHeader";
import SignUp from "./component/SignUp";
import JobPortalHome from "./component/JobPortalHome";
import JobSeeker from "./component/JobSeeker";
import Recruiter from "./component/Recruiter";
import PostJobs from "./component/PostJobs";
import JobReport from "./component/JobReport";
import Profile from "./component/Profile";
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

const App = () => (
    <Router>
        <div >
            <Route path="/profile" component={Profile} />
            <Route path="/jobReport" component={JobReport} />
            <Route path="/postJobs" component={PostJobs} />
            <Route path="/home" component={Home} />
            <Route path="/welcome" component={HomeHeader} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={SignUp} />
            <Route path="/portal" component={JobPortalHome} />
            <Route path="/jobseeker" component={JobSeeker} />
            <Route path="/recruiter" component={Recruiter} />
        </div>
    </Router>
);
// import logo from './logo.svg';
// import './App.css';

// function App() {
//     return (
//         <div className="App">
//             <Login/>
//         </div>
//     );
// }

export default App;
