import React from 'react';

import { NavLink as RRNavLink, Redirect, useHistory } from "react-router-dom";
// import Login from "./Login"
// import Register from "./Register"
import "./Header.css"
import { logout } from '../modules/authManager';
import { Nav, NavItem, NavLink } from 'reactstrap';
export default function Header({ isLoggedIn }) {
    const history = useHistory()
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    const homeClick = () => {
        history.push("/")
    }
    return (
        <div className="tape2">
            <div>
                <div onClick={homeClick} className="tape-text" to="/">HomePRO</div>
            </div>
            {isLoggedIn &&
                <div className="tape">
                    <Nav className="navbutton">

                        <NavItem>
                            <NavLink tag={RRNavLink} to="/projects">Projects</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink tag={RRNavLink} to="/iventory/materials">Inventory</NavLink>
                        </NavItem> */}
                        {/* <button to="/Inventory">Inventory</button> */}

                    </Nav>
                    <button id="logout" onClick={logout}>Logout</button>
                </div>
            }
            <div>

                {!isLoggedIn &&
                    <div>
                        <div className="tape">Login</div>
                        <NavLink>
                            <Redirect to="/login"></Redirect>
                        </NavLink>
                        <NavLink>
                            <Redirect to="/register"></Redirect>
                        </NavLink>
                    </div>
                }
            </div>
        </div >)
}