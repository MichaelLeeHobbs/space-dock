import React from 'react'
import { api, db } from '../client'
import history from '../history'

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', userName: '', pass: '', passAgain: '', errors: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault(); 
    if (this.state.name.length === 0 || this.state.userName.length === 0 || this.state.pass.length === 0 || this.state.passAgain.length === 0 || this.state.pass !== this.state.passAgain) {
      this.setState({ errors: true })
      return
    }
    const email = this.state.userName;
    const name = this.state.name;
    const pass = this.state.pass;

    console.log("Signup: ", email, name, pass)

    // Send sign up request
    db.signUp(email, name, pass, 'default').then(res => {
      if (res.status === 200) {
        // Set the token id to enable crud operations
        api.setToken(res.data.token)
        
        // Set the token and userId in localstorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user._id);

        // Go to the home page
        history.push('/home');
        return;
      }

      // Show an alert when signup failed
      alert('Sign Up Failed');
      console.log('Sign Up Error:', res)
    }).catch(ex => {
      // Exception occured while processing request
      console.log('Sign Up Error:', ex)
    });
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <span className="login-form-logo">
              <i className="material-icons logo">landscape</i>
            </span>
            <span className="login-form-title">SIGN UP</span>
            <div className="login-wrap-input validate-input">
              <input className="login-form-input" type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
              <span className="login-focus-input" ><i className="material-icons form-icon">person</i></span>
            </div>
            {this.state.errors && this.state.name.length === 0 && <p className="login-form-error">Name is required</p>}
            <div className="login-wrap-input validate-input">
              <input className="login-form-input" type="text" name="userName" placeholder="Username" onChange={this.handleChange} value={this.state.userName} />
              <span className="login-focus-input" ><i className="material-icons form-icon">person</i></span>
            </div>
            {this.state.errors && this.state.userName.length === 0 && <p className="login-form-error">Username is required</p>}
            <div className="login-wrap-input validate-input" >
              <input className="login-form-input" type="password" name="pass" placeholder="Password" onChange={this.handleChange} value={this.state.pass} />
              <span className="login-focus-input" ><i className="material-icons form-icon">lock</i></span>
            </div>
            {this.state.errors && this.state.pass.length === 0 && <p className="login-form-error">Password is required</p>}
            <div className="login-wrap-input validate-input" >
              <input className="login-form-input" type="password" name="passAgain" placeholder="Confirm Password" onChange={this.handleChange} value={this.state.passAgain} />
              <span className="login-focus-input" ><i className="material-icons form-icon">lock</i></span>
            </div>
            {this.state.errors && this.state.pass.length > 0 && this.state.pass !== this.state.passAgain && <p className="login-form-error">Password does not matches</p>}
            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={this.handleSubmit}>
                SignUp
						</button>
            </div>
            <div className="login-card-bottom-text">
              <a className="txt1" href="/">
                Already an user? Login.
						</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpComponent