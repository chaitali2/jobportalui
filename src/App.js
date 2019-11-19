import React from 'react';
import './css/Style.css';
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import JobPortalHome from "./component/JobPortalHome";
import JobSeeker from "./component/JobSeeker";
import Recruiter from "./component/Recruiter";
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

const App = () => (
    <Router>
        <div >
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
