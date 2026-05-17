import { Route, Routes } from "react-router";
import Home from "../Pages/Home";
import Phones from "../Pages/Phones";
import Panel from "../Pages/Panel";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
      </Routes>
    </>
  )
};

export default App;