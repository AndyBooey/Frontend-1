import { Component } from "react";
import { Link } from "react-router-dom";
import "./Registration.css";

class Registration extends Component {
  state = {
    acceptTerms: false, // Tracks if user accepted T&C
    showTerms: false // Tracks if T&C modal is open
  };

  // Handles checkbox state for T&C
  handleCheckbox = (e) => {
    this.setState({ acceptTerms: e.target.checked });
  };

  // Opens T&C modal and disables page scroll
  openTerms = () => {
    this.setState({ showTerms: true });
    document.body.style.overflow = "hidden";
  };

  // Closes T&C modal and re-enables page scroll
  closeTerms = () => {
    this.setState({ showTerms: false });
    document.body.style.overflow = "auto";
  };

  // Click "I Agree" inside modal; checks checkbox and closes modal
  agreeAndClose = () => {
    this.setState({ acceptTerms: true, showTerms: false });
    document.body.style.overflow = "auto";
  };

  // Handles form submission
  handleRegister = (e) => {
    e.preventDefault();
    if (!this.state.acceptTerms) {
      alert("You must accept the Terms & Conditions");
      return;
    }
    alert("Registration successful! Redirecting to login...");
    window.location.href = "/";
  };

  render() {
    return (
      <>
        {/* Registration form container, blurred when modal is open */}
        <div className={`register-container ${this.state.showTerms ? "blurred" : ""}`}>
          <div className="register-form">
            <img src="/logo.png" alt="Logo" className="register-logo" />
            <h2>Registration</h2>

            <form onSubmit={this.handleRegister}>
              
              <input type="email" name="email" placeholder="Email" required />
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="text" placeholder="Full Name" required />

              {/* Age Group Selection */}
              <div className="age-group">
                <span className="age-label">Select Age Group:</span><br />
                <label className="age-option">
                  <input type="radio" name="age" value="13-17" required /> 13–17
                </label>
                <label className="age-option">
                  <input type="radio" name="age" value="18-24" /> 18–24
                </label>
                <label className="age-option">
                  <input type="radio" name="age" value="25-34" /> 25–34
                </label>
                <label className="age-option">
                  <input type="radio" name="age" value="35-44" /> 35–44
                </label>
                <label className="age-option">
                  <input type="radio" name="age" value="45+" /> 45+
                </label>
              </div>
              <input type="text" placeholder="Occupation" required />
              {/* Marital Status Dropdown */}
              
              <select className="marital-select" required>
                <option value="" disabled selected>Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                
              </select>

              {/* Location */}
              <input type="text" placeholder="Location (City, Country)" required />

              {/* T&C Checkbox */}
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

              <button type="submit">Register</button>
            </form>

            <div className="link-text">
              Already have an account? <Link to="/">Login here</Link>
            </div>
          </div>
        </div>

        {/* Modal for Terms & Conditions */}
        {this.state.showTerms && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Terms & Conditions</h3>
              <div className="modal-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Curabitur sit amet risus id sapien luctus tincidunt. 
                  Aliquam cursus lorem vel justo varius, at ultrices nulla dapibus.
                  
                </p>
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
