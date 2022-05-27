import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.favoriteSong();
  }

  favoriteSong = async () => {
    this.setState({ loading: true });
    await addSong(this.props);
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
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
          Favorita
          <input
            onClick={ this.favoriteSong }
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
  trackId: PropTypes.string.isRequired,
};
