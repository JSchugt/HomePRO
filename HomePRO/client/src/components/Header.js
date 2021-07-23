import React, { useState } from 'react';

import { NavLink as RRNavLink, Redirect, Route } from "react-router-dom";
import Login from "./Login"
import Register from "./Register"
import "./Header.css"
import { logout } from '../modules/authManager';
import { Nav, NavLink } from 'reactstrap';
export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="tape2">
            <div>
                <div className="tape-text" to="/">HomePRO</div>
            </div>
            {isLoggedIn &&
                <div className="tape">
                    <button to="/Projects">Projects</button>
                    <button to="/Inventory">Inventory</button>
                    <button onClick={logout}>Logout</button>
                </div>
            }
            <div>

                {!isLoggedIn &&
                    <div>
                        <div className="tape">Login</div>
                        <NavLink>
                            <Redirect to="/login"></Redirect>
                        </NavLink>
                    </div>
                }
            </div>
        </div >)
}