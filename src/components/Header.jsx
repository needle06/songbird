import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

export default class Header extends React.Component  {
  constructor(props) {
    super(props);
    const { currentLevel, currentScore} = props;
    this.state = {
      currentLevel,
      currentScore,
    }
    this.levelNames = ["Разминка", "Воробьиные", "Лесные птицы", "Певчие птицы", "Хищные птицы", "Морские птицы"];
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const dict = {};
    if (nextProps.currentLevel !== prevState.currentLevel) {
      dict.currentLevel = nextProps.currentLevel;
    }
    if (nextProps.currentScore !== prevState.currentScore) {
      dict.currentScore = nextProps.currentScore;
    }
    return dict;
  }

  render() {
    const {currentLevel, currentScore} = this.state;
    return (
        <header className="d-flex">
          <div className="top-panel d-flex">
            <div className="logo"></div>
            <h5>Score: <span className="score">{currentScore}</span></h5>
          </div> 
          <ul className="birds-levels-list">{
            this.levelNames.map((el,i) => (
              <li key={i} className={currentLevel === i ? "li-active" : ""}>{el}</li>
            ))
          }</ul>
        </header>
    );
  }
}

Header.propTypes = {
  currentLevel: PropTypes.number,
  currentScore: PropTypes.number,

};

Header.defaultProps = {
  currentLevel: 0,
  currentScore: 0,
};