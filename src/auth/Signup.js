import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../constants/server';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleNameChange = (e) => { this.setState({ name: e.target.value }); }

  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }

  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    // TODO: SEND DATA TO SERVER
    console.log(this.state);
    axios.post(`${SERVER_URL}/auth/signup`, this.state)
    .then(response=> {
      console.log('Success');
      console.log(response);
      // set response.data.token to local storage
      localStorage.setItem('serverToken', response.data.token)
      // TODO: update user in parent component
      this.props.getUser()
    })
    .catch(err => {
      console.log('error axios to server:');
      console.log(err);
    })
  }

  render() {
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    return(
        <div>
          <h2>Signup as a new user</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input name="Name" placeholder="What is your name?" value={this.state.name} onChange={this.handleNameChange} />
            </div>
            <div>
              <input name="Email" placeholder="What is your email?" value={this.state.email} onChange={this.handleEmailChange} />
            </div>
            <div>
              <input name="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
            <input type="submit" value="Sign Me Up!" className="button" />
          </form>
        </div>
      );
  }
}

export default Signup;
