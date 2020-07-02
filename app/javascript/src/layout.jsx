import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    authenticated: false
    }
    this.handleSignout = this.handleSignout.bind(this)
}

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: true
        });
      })
  }


  handleSignout() {
  fetch('/api/sessions', safeCredentials({
    method: 'DELETE'
  }))
    .then(handleErrors)
    .then(response => {
      console.log(response);
      this.setState({
        authenticated: false
      })
    });
}

  render() {
    let { authenticated } = this.state;
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              {authenticated && <li className="nav-item"><a className="nav-link" href="/profile">Profile</a></li>}
              {authenticated ? <li className="nav-item"><button type="button" className="btn nav-link btn-primary text-white" onClick={this.handleSignout}>Sign Out</button></li> : <li className="nav-item"><a href={`/login?redirect_url=${window.location.pathname}`}><button type="button" className="btn nav-link btn-primary text-white">Log-in or Sign-up</button></a></li>}
              {authenticated && <li className="nav-item"></li>}
            </ul>
          </div>
        </nav>

        {this.props.children}

        <footer className="p-3 bg-light">
          <div>
            <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Layout;
