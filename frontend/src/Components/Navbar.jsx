import { Link } from "react-router"

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link> <br />
            <Link to="/phones">Phones</Link> <br />
            <Link to="/panel">Panel</Link> <br />
            <Link to="/signUp">Sign up</Link> <br />
            <Link to="/logIn">Log in</Link> <br />
        </nav>
    )
};

export default Navbar;