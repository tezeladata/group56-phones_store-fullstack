import { Route, Routes } from "react-router";
import Home from "./Pages/Home.jsx";
import Phones from "./Pages/Phones.jsx";
import Panel from "./Pages/Panel.jsx";
import SignUp from "./Pages/SignUp.jsx";
import LogIn from "./Pages/LogIn.jsx";
import Navbar from "./Components/Navbar.jsx";

const App = () => {
  return (
    <>
      <Navbar />

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