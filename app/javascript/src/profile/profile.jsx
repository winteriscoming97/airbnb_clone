import React from 'react';
import { handleErrors } from '@utils/fetchHelper';

import './profile.scss';

class Profile extends React.Component {
  state = {
    authenticated: false,
    loading: true,
    user: null,
    properties: [],
    bookings: []
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Profile;
