import { Outlet, Link } from "react-router-dom";
import "../css/navbar.css"
import logoFrigo from "../images/kisspng-refrigerator-drawing-clip-art-blue-refrigerator-door-5a806563a83da9.4230386515183640036891.png"

const Navbar = () => {
    return (
        <>
            <div className="navbarContainer">
                <nav>
                    <Link to="/personalingredients" style={{ textDecoration: "none" }}>
                        <div className="logo">
                            <ul>
                                <li>
                                    <h1>MyFrigo</h1>
                                    <img src={logoFrigo} alt="frigorifero"></img>

                                </li>
                            </ul>
                        </div>
                    </Link>
                    <div className="links">
                        <ul>
                            <li>
                                <Link to="/favorite" className="link"><b>Preferiti</b></Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="link"
                                ><b>Login</b></Link>
                            </li>
                            <li>
                                <Link to="/signup" className="link" id="signupButton"><b>Signup</b></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <Outlet />
        </>
    )
};

export default Navbar;