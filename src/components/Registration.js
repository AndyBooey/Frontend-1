import { Component } from "react";
import { Link } from "react-router-dom";
import "./Registration.css";
import termsText from "../assets/terms.txt";
import { validateEmails, validateTerms } from "../utils/validators";
import { registerUser } from "../utils/api";

class Registration extends Component {
  state = {
    email: "",
    reEmail: "",
    emailError: "",
    acceptTerms: false,
    showTerms: false,
    termsContent: "",
    submitting: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, emailError: "" });
  };

  handleCheckbox = (e) => {
    this.setState({ acceptTerms: e.target.checked, termsError: "" });
  };

  //fetches Terms & Conditions text 
  componentDidMount() {
    fetch(termsText)
      .then((res) => res.text())
      .then((text) => this.setState({ termsContent: text }));
  }

  //shows T&C modal
  openTerms = () => {
    this.setState({ showTerms: true });
    document.body.style.overflow = "hidden";
  };

  //hides T&C modal
  closeTerms = () => {
    this.setState({ showTerms: false });
    document.body.style.overflow = "auto";
  };

  // Accept terms + close modal
  agreeAndClose = () => {
    this.setState({ acceptTerms: true, showTerms: false });
    document.body.style.overflow = "auto";
  };

  // Prevent default submit
  handleRegister = async (e) => {
    e.preventDefault();
    const { email, reEmail, acceptTerms } = this.state;

    // Validation
    const emailError = validateEmails(email, reEmail);
    if (emailError) return this.setState({ emailError });

    //check T&C acceptance
    const termsError = validateTerms(acceptTerms);
    if (termsError) return this.setState({ termsError });

    //Registration logic here
    /*
    // Submit to API
    const userData = { ...this.state }; 
    this.setState({ submitting: true });

    try {
      await registerUser(userData);
      alert("Registration successful! Redirecting to login...");
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
      this.setState({ submitting: false });
    }
    */
  };

  render() {
    const { emailError, submitting, showTerms, termsContent } = this.state;

    return (
      <>
        <div className={`register-container ${showTerms ? "blurred" : ""}`}>
          <div className="register-form">
            <img src="/logo.png" alt="Logo" className="register-logo" />
            <h2>Registration</h2>

            <form onSubmit={this.handleRegister}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />

              <input
                type="email"
                name="reEmail"
                placeholder="Re-Enter Email"
                required
                value={this.state.reEmail}
                onChange={this.handleChange}
              />
              {emailError && <div className="inline-error">{emailError}</div>}

              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <input type="text" placeholder="Full Name" required />

              {/* Age Group */}
              <select className="age-label" required defaultValue="">
                <option value="" disabled>
                  Age Group
                </option>
                <option value="13-17">13-17</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>

              <select className="marital-select" required defaultValue="">
                <option value="" disabled>
                  Marital Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>

              <input type="text" placeholder="Location (City, Country)" required />

              <div className="checkbox-row">
                <input
                  type="checkbox"
                  checked={this.state.acceptTerms}
                  onChange={this.handleCheckbox}
                />
                <label>
                  I accept the{" "}
                  <span className="tnc-link" onClick={this.openTerms}>
                    Terms & Conditions
                  </span>
                </label>
              </div>
              {this.state.termsError && (
                <div className="inline-error">{this.state.termsError}</div>
        )}

              <button type="submit" disabled={submitting}>
                {submitting ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="link-text">
              Already have an account? <Link to="/">Login here</Link>
            </div>
          </div>
        </div>

        {showTerms && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Terms & Conditions</h3>
              <div className="modal-content">
                <pre className="terms-text">{termsContent}</pre>
              </div>
              <div className="modal-buttons">
                <button className="agree-btn" onClick={this.agreeAndClose}>
                  I Agree
                </button>
                <button className="close-btn" onClick={this.closeTerms}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Registration;
