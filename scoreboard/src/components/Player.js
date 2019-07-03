import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import Icon from './Icon';

class Player extends PureComponent {

  static propTypes = {
    changeScore: PropTypes.func,
    removePlayer: PropTypes.func,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    id: PropTypes.number,
    index: PropTypes.number,
  };

  render(){
    const {
      name,
      id,
      score,
      index,
      removePlayer,
      changeScore
    } = this.props;

    return (
      <div className="player">
        <span className="player-name">
          <button className="remove-player" onClick={() => removePlayer(id)}>✖</button>
          <Icon isHighScore={this.props.isHighScore}/>
          { name }
        </span>

        <Counter
          score={score}
          index={index}
          changeScore={changeScore}
          />
      </div>
    );
  }
}

export default Player;
