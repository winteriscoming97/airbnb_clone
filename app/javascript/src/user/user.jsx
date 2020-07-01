import React from 'react';
import Layout from '@src/layout';
import Login from '@src/login/login';
import { handleErrors, safeCredentials } from '@utils/fetchHelper';

import './user.scss';

class User extends React.Component {
  state = {
    properties: [],
    loading: true,
    authenticated: false
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
      this.getProperties();
    }

  getProperties() {
    fetch(`/api/${this.props.user.username}/properties`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: data.properties,
          loading: false
        });
        console.log(data);
      })
  }

  listProperties(properties) {
    if (properties.length > 0) {
      return properties.map(property => {
        return (
          <div key={property.id} className="col-6 col-lg-4 mb-4 property">
            <a href={`/property/${property.id}`} className="text-body text-decoration-none">
              <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})`}} />
              <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
              <h6 className="mb-0">{property.title}</h6>
              <p className="mb-0"><small>{property.price_per_night} USD/night</small></p>
            </a>
          </div>
        )
      });
    }
    else {
      return (
        <h3>No properties to display</h3>
      )
    };
  }

  render () {
    let { user } = this.props;
    let { loading, properties, authenticated } = this.state;
    if (authenticated) {
      return (
        <Layout>
          <div>
            <h1>User Homepage</h1>
            <h3>{user.username}</h3>
            {loading ? <h2>loading</h2> : this.listProperties(properties)}
          </div>
        </Layout>
      )
    }
    else {
      return (
        <div>
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to view this profile.
        </div>
      )
    }
  }
}

export default User;
