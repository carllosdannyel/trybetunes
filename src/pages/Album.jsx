import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musics: [],
    artistName: '',
    albumName: '',
  };

  componentDidMount = async () => {
    await this.fetchMusics();
  };

  fetchMusics = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const fetchApi = await getMusics(id);
    console.log(fetchApi);
    this.setState({
      musics: fetchApi,
      artistName: fetchApi[0].artistName,
      albumName: fetchApi[0].collectionName,
    });
  };

  render() {
    const { musics, artistName, albumName } = this.state;
    const newArray = musics.slice(1, musics.length);

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{albumName}</p>
          {newArray.map((music) => (
            <MusicCard
              key={ musics.trackId }
              name={ music.trackName }
              url={ music.previewUrl }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
