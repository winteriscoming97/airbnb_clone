import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './profile.scss';

class Profile extends React.Component {
  state = {
    authenticated: false,
    loading: true,
    user: this.props.user,
    properties: [],
    bookings: []
  }

  componentDidMount() {
    const { user } = this.state;
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated
        })
        console.log(user);
      })
      .then(() => {
        this.getProperties(user);
        this.getBookings(user);
      })
  }

  getProperties(user) {
    fetch(`/api/${user.username}/properties`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: data.properties
        })
        console.log('Properties: ' + data);
      })
  }

  getBookings(user) {
    fetch(`/api/${user.username}/bookings`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          bookings: data.bookings
        })
        console.log('Bookings: ' + data);
      })
  }

  render() {
    let { authenticated, user, properties, bookings } = this.state;

      return (
        <Layout>
          {authenticated ? <div><h1>Welcome User!</h1></div> : <div><h4>You are not logged in.</h4><p><small>Please <a href={`login?redirect_url=${window.location.pathname}`} rel="noreferrer">Log-in or Sign-up</a> to view your profile</small></p></div>}
          {user && <div><h1>{user.username}</h1></div>}
        </Layout>
      )
  }
}

export default Profile;
