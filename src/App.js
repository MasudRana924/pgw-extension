import { useEffect } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import { useState } from "react";
import Preloader from "./loader/Preloader";
import VerifyOtp from "./components/auth/VerifyOtp";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  const { token } = useSelector(
    (state) => state.userDetails
);
  return (
    <div>
      {loading ? (
        <div>
          <Preloader />
        </div>
      ) : (
        <div className="App">
          <Router>
            {/* <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/main" element={<Main></Main>}></Route>
              <Route path="/verify-otp" element={<VerifyOtp />}></Route>
            </Routes> */}
           <Routes>
              <Route
                path="/"
                element={token ? <Navigate to="/main" /> : <Login />}
              />
              <Route
                path="/main"
                element={token ? <Main /> : <Navigate to="/" />}
              />
              <Route path="/verify-otp" element={<VerifyOtp />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
