import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    name: '',
    loading: true,
  }

  componentDidMount = () => {
    this.getNameUser();
  }

  getNameUser = async () => {
    const userObject = await getUser();
    this.setState({ name: userObject.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (!loading) {
      return (
        <header data-testid="header-component">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <p data-testid="header-user-name">{name}</p>
        </header>
      );
    }
  }
}
