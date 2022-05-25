import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    button: true,
    nome: '',
    loading: false,
    pageSearch: false,
  };

  fetchUser = async () => {
    const { nome } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nome });
    this.setState({ loading: false });
    this.setState({ pageSearch: true });
  }

  activateButton = () => {
    const { nome } = this.state;

    if (nome.length > 2) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  handleChange = ({ target }) => {
    this.setState(
      { [target.name]: target.value }, () => this.activateButton(),
    );
  };

  render() {
    const { button, nome, loading, pageSearch } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="login">
              <input
                value={ nome }
                type="text"
                data-testid="login-name-input"
                name="nome"
                onChange={ this.handleChange }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ button }
                onClick={ this.fetchUser }
              >
                Entrar
              </button>
            </label>
          </form>
        )}
        { pageSearch && <Redirect to="/search" /> }
      </div>
    );
  }
}
