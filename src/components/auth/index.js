import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state);
  }

  render() {
    const { username, password } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="input-container">
          <label className="label">Username: </label>
          <input
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-container">
          <label className="label">Password: </label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          <a href="#" className="link forgotten-password">
            Forgot password?
          </a>
        </div>
        <button type="submit" id="login-btn">
          Login
        </button>
      </form>
    );
  }
}

export default Login;
