import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class search extends Component {
  state = {
    name: '',
    searchedName: '',
    hasEnabledButton: true,
    saveAlbuns: [],
    loading: false,
    exibhition: false,
  }

  fetchAlbuns = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    this.setState(
      {
        saveAlbuns: await searchAlbumsAPI(name),
        loading: false,
        searchedName: name,
      },
      this.hasEnabledButton,
    );
    this.setState({ name: '', hasEnabledButton: true });
  }

  hasEnabledButton = () => {
    const { name, saveAlbuns } = this.state;
    if (saveAlbuns.length !== 0) {
      this.setState({ exibhition: true });
    } else {
      this.setState({ exibhition: false });
    }

    if (name.length >= 2) {
      this.setState({ hasEnabledButton: false });
    } else {
      this.setState({ hasEnabledButton: true });
    }
  }

  handleChange = ({ target: { value } }) => {
    this.setState(
      { name: value }, () => this.hasEnabledButton(),
    );
  };

  render() {
    const {
      name,
      hasEnabledButton,
      searchedName,
      saveAlbuns,
      loading,
      exibhition,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="search">
              <input
                value={ name }
                onChange={ this.handleChange }
                name="search"
                data-testid="search-artist-input"
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ hasEnabledButton }
                onClick={ this.fetchAlbuns }
              >
                Pesquisar
              </button>
            </label>
          </form>
        )}
        <div>
          {
            (exibhition && (
              <div>
                <h1>
                  Resultado de álbuns de:
                  {' '}
                  {`${searchedName}`}
                </h1>
                <ul>
                  {saveAlbuns.map((album) => (
                    <li key={ album.collectionId }>
                      <h3>{album.artistName}</h3>
                      <Link
                        data-testid={ `link-to-album-${album.collectionId}` }
                        to={ `/album/${album.collectionId}` }
                      >
                        <img
                          key={ album.artistId }
                          src={ album.artworkUrl100 }
                          alt={ `Foto do albuma ${album.artistName}` }
                        />
                      </Link>
                      <h3>{album.collectionName}</h3>
                    </li>
                  ))}
                </ul>
              </div>
            )
            )
          }
          {!exibhition && <h2>Nenhum álbum foi encontrado</h2>}
        </div>
      </div>
    );
  }
}
