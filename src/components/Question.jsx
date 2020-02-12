import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import './Question.css';
import birdsData from '../data/birdsData.js'

export default class Question extends React.Component  {
  constructor(props) {
    super(props);
    const { currentLevel, hiddenBird, answerHidden} = props;
    this.state = {
      currentLevel,
      hiddenBird,
      answerHidden
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const dict = {};
    if (nextProps.currentLevel !== prevState.currentLevel) {
      dict.currentLevel = nextProps.currentLevel;
    }
    if (nextProps.hiddenBird !== prevState.hiddenBird) {
      dict.hiddenBird = nextProps.hiddenBird;
    }
    if (nextProps.answerHidden !== prevState.answerHidden) {
      dict.answerHidden = nextProps.answerHidden;
    }
    return dict;
  }

  render () {
    const {currentLevel, hiddenBird, answerHidden} = this.state;
    const selectedBird = birdsData[currentLevel][hiddenBird];

    return (
      <div className="bird-random">
          <img src={answerHidden ? '/public/img/bird.jpg' : selectedBird.image} alt="bird" className="bird-image"/>
          <div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <p className="bird-name">{answerHidden ? "******" : selectedBird.name}</p>
              </li>
              <li className="list-group-item">
                <ReactAudioPlayer
                  src={selectedBird.audio}
                  controls
                />
              </li>
            </ul>
            

          </div>
      </div>
    )
      

  }
}

Question.propTypes = {
  currentLevel: PropTypes.number,
  hiddenBird: PropTypes.number,
  answerHidden: PropTypes.bool,

};

Question.defaultProps = {
  currentLevel: 0,
  hiddenBird: 0,
  answerHidden: true,
};