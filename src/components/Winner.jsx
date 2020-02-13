import React from 'react';
import PropTypes from 'prop-types';
import './Winner.css';

export default class Winner extends React.Component  {
  constructor(props) {
    super(props);
    const { currentScore, gameFinished, onStartGame} = props;
    this.onStartGame = onStartGame;
    this.state = {
      currentScore,
      gameFinished,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const dict = {};
    if (nextProps.currentScore !== prevState.currentScore) {
      dict.currentScore = nextProps.currentScore;
    }
    if (nextProps.gameFinished !== prevState.gameFinished) {
      dict.gameFinished = nextProps.gameFinished;
    }
    return dict;
  }

  render() {
    const {currentScore, gameFinished} = this.state;
    return (
      <div className="game-over" hidden={!gameFinished}>
        <h1>Поздравляем!</h1>
        <p className="final-score">Вы прошли викторину и набрали {currentScore} из 30 возможных баллов</p>
        <button className="btn btn-next btn-game-over" onClick={() => {if(this.onStartGame) this.onStartGame()}}>Попробовать еще раз!</button>
      </div>
    
    );
  }
}

Winner.propTypes = {
  currentScore: PropTypes.number,
  gameFinished: PropTypes.bool,
  onStartGame: PropTypes.func,
};

Winner.defaultProps = {
  currentScore: 0,
  gameFinished: false,
  onStartGame: undefined,
};