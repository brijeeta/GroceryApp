import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

// import Auth from '../utils/authCOPY';
import './resrc/scss/NavBar.css'
import {ReactComponent as Logo} from './resrc/svgs/shopping-cart.svg'

class AppNavi extends React.Component {
    render(){
        return (
            <div className="NavBar">
                <nav className="nav">
                    <div className="container">
                        <div className="logo">
                            <Logo height='90%' />
                        </div>
                        <div className="searchBar">

                        </div>
                        <div className="userGUI">

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
// const AppNavi = () => {
//     // set modal display state
//     // const [showModal, setShowModal] = useState(false);

//     return (
//         <>
//             <div className="NavBar">
//                 <nav className="nav">
//                     <div className="container">
//                         <div className="logo">
//                             <Logo height='90%' />
//                         </div>
//                         <div className="searchBar">

//                         </div>
//                         <div className="userGUI">

//                         </div>
//                     </div>
//                 </nav>
//             </div>
//         </>
//     );
// };

export default AppNavi;
