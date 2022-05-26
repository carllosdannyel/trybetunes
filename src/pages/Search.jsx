import React, { Component } from 'react';
import Header from '../components/Header';

export default class search extends Component {
  state = {
    name: '',
    hasEnabledButton: true,
  }

  hasEnabledButton = () => {
    const { name } = this.state;

    if (name.length >= 2) {
      this.setState({ hasEnabledButton: false });
    } else {
      this.setState({ hasEnabledButton: true });
    }
  }

  handleChange = ({ target }) => {
    this.setState(
      { name: target.value }, this.hasEnabledButton,
    );
  };

  render() {
    const { name, hasEnabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              value={ name }
              onChange={ this.handleChange }
              name="search"
              data-testid="search-artist-input"
            />
            <button
              disabled={ hasEnabledButton }
              type="submit"
              data-testid="search-artist-button"
              onClick={ this.hasEnabledButton }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}
