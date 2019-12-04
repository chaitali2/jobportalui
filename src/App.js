import React from 'react';
import './css/Style.css';
import Login from "./component/authentication/Login";
import Home from "./component/authentication/Home";
import ChangePassword from "./component/ChangePassword";
import SignUp from "./component/authentication/SignUp";
import JobSeeker from "./component/jobseeker/JobSeeker";
import Recruiter from "./component/recruiter/Recruiter";
import PostJobs from "./component/recruiter/PostJobs";
import JobReport from "./component/JobReport";
import Profile from "./component/Profile";
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

const App = () => (
    <Router>
        <div >
            <Route path="/jobportal/profile" component={Profile} />
            <Route path="/jobportal/report" component={JobReport} />
            <Route path="/jobportal/postJobs" component={PostJobs} />
            <Route path="/jobportal/home" component={Home} />
            <Route path="/jobportal/login" component={Login} />
            <Route path="/jobportal/signup" component={SignUp} />
            <Route path="/jobportal/jobseeker" component={JobSeeker} />
            <Route path="/jobportal/recruiter" component={Recruiter} />
            <Route path="/jobportal/change_password" component={ChangePassword} />
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
