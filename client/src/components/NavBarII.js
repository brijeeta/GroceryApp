import React, { useState, ReactDOM } from 'react';
import { Link } from 'react-router-dom';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

// import React from 'react'

const NavBarII = () => {
    const navElem = <nav>Test</nav>;
    ReactDOM.render(navElem, document.getElementById('NavBar'))


    return (
        <>
            <div id="NavBar">
                <nav id="nav">
                    <div id="logo">
                        
                    </div>
                    <div id="search">

                    </div>
                    <div id="auth">

                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBarII
