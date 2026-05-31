import { Link } from "react-router"
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";

const Navbar = () => {
    const {logOutUser, user} = useAuth();

    const handleClick = async () => {
        await logOutUser()
    };

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <nav>
            <Link to="/">Home</Link> <br />
            
            {
                user?.role !== "admin" && (
                    <>
                        <Link to="/phones">Phones</Link> <br />
                    </>
                )
            }
            
            {
                user?.role === "admin" && (
                    <>
                        <Link to="/panel">Panel</Link> <br />
                    </>
                )
            }
            
            {!user && (
                <>
                    <Link to="/signUp">Sign up</Link> <br />
                    <Link to="/logIn">Log in</Link> <br />
                </>
            )}
            
            {
                user && <button onClick={handleClick}>Log out</button>
            }
        </nav>
    )
};

export default Navbar;