import { Component } from "react";
import "./Login.css";
import { withRouter } from "./withRouter";

class OTPLogin extends Component {
state = {
email: "",
otp: "",
step: 1, // 1 = enter email, 2 = enter OTP
loading: false,
};

// Step 1: Request OTP email
handleEmailSubmit = async (e) => {
e.preventDefault();
if (!this.state.email) return;


this.setState({ loading: true });

try {
  const res = await fetch("https://otp-auth-api-five.vercel.app/api/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: this.state.email }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("OTP sent to your email. Check inbox!");
    this.setState({ step: 2 });
  } else {
    alert(data.message || "Error sending OTP.");
  }
} catch (err) {
  console.error(err);
  alert("Network error. Try again.");
} finally {
  this.setState({ loading: false });
}


};

// Step 2: Verify OTP
handleOtpSubmit = async (e) => {
e.preventDefault();
if (!this.state.otp) return;


this.setState({ loading: true });

try {
  const res = await fetch("https://otp-auth-api-five.vercel.app/api/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: this.state.email, otp: this.state.otp }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login successful!");
    // optional: store token if returned
    if (data.token) localStorage.setItem("authToken", data.token);
    window.location.href = "/"; // redirect after login
  } else {
    alert(data.message || "Invalid OTP. Try again.");
  }
} catch (err) {
  console.error(err);
  alert("Network error. Try again.");
} finally {
  this.setState({ loading: false });
}


};

render() {
const { step, loading, email, otp } = this.state;


return (
  <div className="login-container">
    <div className="login-form">
      {step === 1 && (
        <form onSubmit={this.handleEmailSubmit}>
          <h2>Login with Email OTP</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            required
          />
          <button type="submit" className="otp-button" disabled={loading}>
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={this.handleOtpSubmit}>
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter the OTP sent to your email"
            value={otp}
            onChange={(e) => this.setState({ otp: e.target.value })}
            required
          />
          <button type="submit" className="otp-button" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      <button
        className="back-button"
        onClick={() => this.props.navigate("/login")}
        disabled={loading}
      >
        Back to Login
      </button>
    </div>
  </div>
);


}
}

export default withRouter(OTPLogin);
