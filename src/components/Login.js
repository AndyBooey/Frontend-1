import { Component } from "react";
import { Link } from "react-router-dom";

import "./dummy1_login.css";
import { withRouter } from "./withRouter";

// You can replace this with Auth0 SDK call
const loginWithGoogle = () => {
    // DUMMY PLACEHOLDER
    console.log("Calling Auth0 Google login...");
    window.location.href = "/auth/google"; // placeholder
};

class Login extends Component {
    handleLogin = (e) => {
        e.preventDefault();
        // Legacy username/password flow (can be removed later)
        window.location.href = "https://www.creatingwings.org/";
    };

    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    <img src="/logo.png" alt="Logo" className="login-logo" />
                    <h2>Login</h2>

                    <form onSubmit={this.handleLogin}>
                        {/* Username */}
                        <label className="field-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            required
                        />

                        {/* Password */}
                        <label className="field-label">Password</label>

                        <input
                            type="password"
                            name="password"
                            required
                        />

                        <div className="forgot-password">
                            <a href="#">Forgot password?</a>
                        </div>



                        <button type="submit">Login</button>
                    </form>

                    <div className="or-divider">OR</div>

                    {/* Google Login Button */}
                    <button
                        className="google-login-button"
                        onClick={loginWithGoogle}
                    >
                        <img
                            src="/google-logo.png"
                            alt=""
                            className="google-icon"
                        />
                        Continue with Google
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
