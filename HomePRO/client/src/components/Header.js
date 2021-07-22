import React from 'react';
import "./Header.css"
export default function Header({ isLoggedIn }) {


    return (
        <div class="tape2">
            <div class="tape-text"> HomePRO </div>
            <div class="tape">
                <button>Projects</button>
                <button>Inventory</button>
                <button id="logout">Logout/Login</button>
            </div>

        </div>
    )
}
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink
// } from 'reactstrap';
// import { logout } from '../modules/authManager';

// export default function Header({ isLoggedIn }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     return (
//         <div>
//             <Navbar color="light" light expand="md">
//                 <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
//                 <NavbarToggler onClick={toggle} />
//                 <Collapse isOpen={isOpen} navbar>
//                     <Nav className="mr-auto" navbar>
//                         { /* When isLoggedIn === true, we will render the Home link */}
//                         {isLoggedIn &&
//                             <NavItem>
//                                 <NavLink tag={RRNavLink} to="/">Projects</NavLink>
//                             </NavItem>
//                         }
//                         {<>
//                             <NavItem>
//                                 <NavLink tag={RRNavLink} to="/Inventory">Inventory </NavLink>
//                             </NavItem>
//                         </>}
//                     </Nav>
//                     <Nav className="mr-auto" navbar>
//                         { /* When isLoggedIn === true, we will render the ategories link */}
//                         {isLoggedIn &&
//                             <NavItem>
//                                 <NavLink tag={RRNavLink} to="/categories">Categories</NavLink>
//                             </NavItem>
//                         }
//                     </Nav>
//                     <Nav className="mr-auto" navbar>
//                         { /* When isLoggedIn === true, we will render the ategories link */}
//                         {isLoggedIn &&
//                             <NavItem>
//                                 <NavLink tag={RRNavLink} to="/posts">Posts</NavLink>
//                             </NavItem>
//                         }
//                     </Nav>


//                     <Nav navbar>
//                         {isLoggedIn &&
//                             <>
//                                 <NavItem>
//                                     <a aria-current="page" className="nav-link"
//                                         style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
//                                 </NavItem>
//                             </>
//                         }
//                         {!isLoggedIn &&
//                             <>
//                                 <NavItem>
//                                     <NavLink tag={RRNavLink} to="/login">Login</NavLink>
//                                 </NavItem>
//                                 <NavItem>
//                                     <NavLink tag={RRNavLink} to="/register">Register</NavLink>
//                                 </NavItem>
//                             </>
//                         }

//                     </Nav>
//                 </Collapse>
//             </Navbar>
//         </div>
//     );
// }
