import React from 'react';
import './css/Style.css';
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import JobPortalHome from "./component/JobPortalHome";
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

const App = () => (
    <Router>
        <div >
            <Route path="/login" component={Login} />
            <Route path="/registration" component={SignUp} />
            <Route path="/portal" component={JobPortalHome} />
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
