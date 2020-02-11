import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import './BirdCard.css';
import birdsData from '../data/birdsData.js'

export default class Header extends React.Component  {
  constructor(props) {
    super(props);
    const { currentLevel, currentBird} = props;
    this.state = {
      currentLevel,
      currentBird,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const dict = {};
    if (nextProps.currentLevel !== prevState.currentLevel) {
      dict.currentLevel = nextProps.currentLevel;
    }
    if (nextProps.currentBird !== prevState.currentBird) {
      dict.currentBird = nextProps.currentBird;
    }
    return dict;
  }

  render () {
    const {currentLevel, currentBird} = this.state;
    const selectedBird = birdsData[currentLevel][currentBird];
    if (!selectedBird) {
      return (
        <div className="bird-card card">
          <p className="instruction">Послушайте плеер. Выберите птицу из списка</p>
        </div>
      )
    }
    return (
      <div className="bird-card card">
        <div className="card-body">
          <img src={selectedBird.image} alt="bird" className="bird-image"/>
          <div className="bird-name-song">
            <h4>{selectedBird.name}</h4>
            <span>{selectedBird.species}</span>

          </div> 
        </div>
        <ReactAudioPlayer
              src={selectedBird.audio}
              controls
            />
        <p className="bird-description">{selectedBird.description}</p>
       
      </div>
    )
      

  }
}

Header.propTypes = {
  currentLevel: PropTypes.number,
  currentBird: PropTypes.number,

};

Header.defaultProps = {
  currentLevel: 0,
  currentBird: 0,
};