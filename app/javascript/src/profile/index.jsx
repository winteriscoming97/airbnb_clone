import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile';


document.addEventListener("DOMContentLoaded", () => {
  let node = document.getElementById('params');
  let user = node.getAttribute('data-params');
  node.remove();
  ReactDOM.render(
    <Profile user={JSON.parse(user).user}/>,

    document.body.appendChild(document.createElement('div'))
  )
})
