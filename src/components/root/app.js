import React from 'react';
import Routes from './routes/routes';
import Navbar from './navbar';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}
