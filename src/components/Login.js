import { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { withRouter } from "./withRouter";



class Login extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    window.location.href = "https://www.creatingwings.org/";
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <img src="/logo.png" alt="Logo" className="login-logo" />
          <h2>Login</h2>

          <form onSubmit={this.handleLogin}>
            
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <div className="or-divider">OR</div>
          {/* Simple button that only routes to the OTP page */}
          <button
            className="otp-button"
            onClick={() => this.props.navigate('/email-otp-login')}
          >
            Continue with Email
          </button>

          <div className="link-text">
            New user? <Link to="/register">Click here to register</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);