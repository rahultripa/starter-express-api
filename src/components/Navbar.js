import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation,useNavigate } from "react-router-dom";

  

const Navbar = (props) => {
    const navigate = useNavigate();
   
    const handleLogout=()=>{

        localStorage.removeItem('token');
        navigate("/Login");
         
    }
 let location = useLocation();
 //const amount= useSelector(state=> state.amount)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook {props.schoolName.name}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/Holidayslist"? "active": ""}`} aria-current="page" to="/Holidays">Holidays</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li>

                    </ul>

                    {/* <button  className="btn btn-primary mx-1"  role="button">Your Balance {amount}</button>
                    */}
                  
                    {!localStorage.getItem('token')?
                    
                    <form className="d-flex"> 
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>:
                    <button  className="btn btn-primary mx-1" onClick={handleLogout} role="button">Logout</button>
                   
                    // <button  className="btn btn-primary mx-1"  role="button">Your Balance </button>
                   
                }
                </div>
            </div>
        </nav>
    )
}

export default Navbar