import React from 'react';
import './css/Style.css';
import Login from "./component/authentication/Login";
import Home from "./component/Home";
import HomeHeader from "./component/authentication/HomeHeader";
import SignUp from "./component/authentication/SignUp";
import JobPortalHome from "./component/JobPortalHome";
import JobSeeker from "./component/jobseeker/JobSeeker";
import Recruiter from "./component/recruiter/Recruiter";
import PostJobs from "./component/recruiter/PostJobs";
import JobReport from "./component/JobReport";
import Profile from "./component/Profile";
import ApplyJobs from "./component/jobseeker/ApplyJobs";
import Job from "./component/Job";
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

const App = () => (
    <Router>
        <div >
            <Route path="/jobportal/profile" component={Profile} />
            <Route path="/jobportal/report" component={JobReport} />
            <Route path="/jobportal/postJobs" component={PostJobs} />
            <Route path="/home" component={Home} />
            <Route path="/welcome" component={HomeHeader} />
            <Route path="/jobportal/login" component={Login} />
            <Route path="/jobportal/signup" component={SignUp} />
            <Route path="/portal" component={JobPortalHome} />
            <Route path="/jobportal/jobseeker" component={JobSeeker} />
            <Route path="/jobportal/recruiter" component={Recruiter} />
            <Route path="/applyjoblist" component={ApplyJobs} />
            <Route path="/job" component={Job} />
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
