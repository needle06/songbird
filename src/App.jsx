import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header.jsx';
import Question from './components/Question.jsx'
import BirdCard from './components/BirdCard.jsx';
import BirdsList from './components/BirdsList.jsx';
import Winner from './components/Winner.jsx';
import birdsData from './data/birdsData.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      score: 0,
      hiddenBird: Math.floor(Math.random() * Math.floor(birdsData[0].length)),
      levelFinished: false,
      selectedBird: -1,
      gameFinished: false
    }
    this.handleOnSelectedBird = this.handleOnSelectedBird.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.restartGame = this.restartGame.bind(this)
  }


  handleOnSelectedBird(id, attempts) {
    const {levelFinished, hiddenBird, score} = this.state;
    this.setState({
      selectedBird: id
    })
    if (!levelFinished && id === hiddenBird) {
      this.setState({
        levelFinished: true,
        score: score + 5 - attempts + 1,
      })
    }
  }

  startLevel(level) {
    this.setState({
      level: level,
      selectedBird: -1,
      levelFinished: false,
      gameFinished: false,
      hiddenBird: Math.floor(Math.random() * Math.floor(birdsData[this.state.level].length)),
    })
  }

  handleClick() {
    const {levelFinished, level} = this.state;
    if(!levelFinished) return;
    if (level === birdsData.length - 1) {
      this.setState({
        gameFinished: true
      })
    } else {
      this.startLevel(level + 1);
    }
  }

  restartGame() {
    this.setState({
      score: 0,
    });
    this.startLevel(0);
  }

  render() {
    const {level, score, hiddenBird, levelFinished, selectedBird, gameFinished} = this.state;
    return (
      <React.Fragment>
        <div hidden={gameFinished}>
          <Header currentLevel={level} currentScore={score}/>
          <Question currentLevel = {level} hiddenBird = {hiddenBird} answerHidden = {!levelFinished}/>
          <div className="birds-wrapper">
            <BirdsList currentLevel = {level} hiddenBird = {hiddenBird} onSelectedBird={this.handleOnSelectedBird}/>
            <BirdCard currentLevel = {level} currentBird = {selectedBird}/>
          </div>
          <button className={levelFinished ? "btn-color-green btn-next-level" : "btn-next-level"} onClick={this.handleClick}>Next level</button>
        </div>
        <Winner currentScore={score} gameFinished={gameFinished} onStartGame={this.restartGame}/>
      </React.Fragment>
    );
  }
}
export default App;