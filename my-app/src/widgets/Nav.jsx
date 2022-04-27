import React from "react";
import {Link,NavLink} from 'react-router-dom';
function Nav(){
    return(
        <div>
             <nav className="navbar navbar-dark">
             <ul className="navbar-nav mr-auto">
                 <div className="row">
                    <div className="col">
                        <li className="nav-item active">
                            <a className="nav-link" href="/registration">Register</a>
                        </li> 
                    </div>
                    <div className="col">
                        <li  className="nav-item active">
                            <a className="nav-link" href="/emailsend">Verify Email</a>
                        </li> 
                    </div>
                    <div className="col">
                        <li className="nav-item active">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                    </div>
                    
                 </div>
                </ul>
            </nav>
        </div>
       
    )
}
export default Nav;