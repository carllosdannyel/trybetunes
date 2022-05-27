import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorites: false,
  };

  componentDidMount() {
    this.getSongFromLocalStorage();
  }

  handleChange = ({ target }) => {
    this.setState(
      {
        [target.name]:
          target.type === 'checkbox' ? target.checked : target.value,
      },
      this.favoriteSong,
    );
  };

  favoriteSong = async () => {
    this.setState({ loading: true });
    await addSong(this.props);
    this.setState({ loading: false });
  };

  getSongFromLocalStorage = async () => {
    const { trackId } = this.props;
    const getMusic = await getFavoriteSongs();
    const check = getMusic.some((music) => music.trackId === trackId);
    this.setState({ favorites: check });
  };

  render() {
    const { loading, favorites } = this.state;
    const { name, url, trackId } = this.props;

    return (
      <div>
        {loading ? <Loading /> : null}
        <p>{name}</p>
        <audio src={ url } data-testid="audio-component" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor="favorites">
          Favoritar
          <input
            name="favorites"
            checked={ favorites }
            onChange={ this.handleChange }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorites"
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
