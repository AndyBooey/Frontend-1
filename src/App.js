import { Component, use } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import OTPLogin from "./components/OTPlogin";


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/email-otp-login" element={<OTPLogin />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
