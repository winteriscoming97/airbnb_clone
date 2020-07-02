import React from 'react';
import Layout from '@src/layout';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import { handleErrors } from '@utils/fetchHelper';

import './login.scss';

class Login extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated
        });
      })
  }

  toggle = () => {
    this.setState({
      show_login: !this.state.show_login
    });
  }

  render () {
    const { authenticated, show_login } = this.state;
    if (authenticated) {
      return (
        <div>
          <nav className="navbar navbar-expand navbar-light bg-light">
            <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You are already logged in 🙂</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="p-3 bg-light">
            <div>
              <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
            </div>
          </footer>
        </div>

      )
    }

    return (
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                {show_login ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
              </div>
            </div>
          </div>
        </div>

        <footer className="p-3 bg-light">
          <div>
            <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
          </div>
        </footer>
      </div>
    )
  }
}

export default Login;
