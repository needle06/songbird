import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header.jsx';
import BirdCard from './components/BirdCard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      score: 0,
    }
  }
  render() {
    const {level, score} = this.state;
    return (
      <React.Fragment>
        <Header currentLevel={level} currentScore={score}/>
        <BirdCard currentLevel = {level} currentBird = {0}/>
      </React.Fragment>
    );
  }
}
export default App;