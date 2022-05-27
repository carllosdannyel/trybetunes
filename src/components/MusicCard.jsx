import React from 'react';
import { PropTypes } from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { name, url } = this.props;
    return (
      <div>
        <p>{name}</p>
        <audio src={ url } data-testid="audio-component" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
