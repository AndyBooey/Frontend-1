import { Component } from "react";
import "./Login.css";
import { withRouter } from "./withRouter";

class OTPLogin extends Component {
  state = {
    email: "",
    password: "",
    otp: "",
    step: 1,
    loading: false,
  };

  // Step 1: Registering user (email + password) which fetches the API to send OTP
  handleEmailSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) return;
    this.setState({ loading: true });

    try {
      const res = await fetch(
        "https://otp-auth-api-five.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Account created. OTP sent to your email.");
        this.setState({ step: 2 });
      } else {
        alert(data.message || "Error creating account.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      this.setState({ loading: false });
    }
  };

  // Step 2: Verifying OTP
  handleOtpSubmit = async (e) => {
    e.preventDefault();
    const { email, otp } = this.state;
    if (!otp) return;

    this.setState({ loading: true });

    try {
      const res = await fetch(
        "https://otp-auth-api-five.vercel.app/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Email Verified Successfully.");
        window.location.href = "/";
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { step, loading, email, password, otp } = this.state;

    return (
      <div className="login-container">
        <div className="login-form">

          {step === 1 && (
            <form onSubmit={this.handleEmailSubmit}>
              <h2>Login</h2>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={this.handleOtpSubmit}>
              <h2>Verify OTP</h2>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => this.setState({ otp: e.target.value })}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }
}

export default withRouter(OTPLogin);
