import React, { Component } from 'react';
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
          <p data-testid="header-user-name">{name}</p>
        </header>
      );
    }
  }
}
