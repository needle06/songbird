import React from 'react';
import PropTypes from 'prop-types';
import './BirdsList.css';
import birdsData from '../data/birdsData.js'

export default class BirdsList extends React.Component {
  constructor(props) {
    super(props);
    const { currentLevel, hiddenBird, onSelectedBird} = props;
    this.onSelectedBird = onSelectedBird;
    const mask = new Array(birdsData[currentLevel].length).fill(false)
    this.state = {
      currentLevel,
      hiddenBird,
      mask,
      maskFrozen: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const dict = {};
    if (nextProps.currentLevel !== prevState.currentLevel) {
      dict.currentLevel = nextProps.currentLevel;
      const mask = new Array(birdsData[dict.currentLevel].length).fill(false)
      dict.mask = mask;
      dict.maskFrozen = false;
    }
    if (nextProps.hiddenBird !== prevState.hiddenBird) {
      dict.hiddenBird = nextProps.hiddenBird;
    }
    return dict;
  }



  handleClick(birdId) {
    let {mask, maskFrozen, hiddenBird} = this.state;
    if (!maskFrozen) {
      mask[birdId] = true;
      this.setState({mask});
    }
    if (hiddenBird === birdId) {
      this.setState({maskFrozen: true})
    }
    const attempts = mask.filter(el=>el).length;
    if (this.onSelectedBird) this.onSelectedBird(birdId, attempts);
  } 

  render () {     
    const {currentLevel, hiddenBird, mask} = this.state;
    const names = birdsData[currentLevel].map(el => el.name);

    return (
      <ul className="list-group list-group-flush birds-list">
        {names.map((el,i) => (
          <li key={i} className="list-group-item" onClick ={() => this.handleClick(i)}>
            <span className={"li-type " + (mask[i] ? (hiddenBird === i ? "li-green" : "li-red") : "")}></span>
            {el}
          </li>
        ))}
      </ul>
    )
  }
}

BirdsList.propTypes = {
  currentLevel: PropTypes.number,
  hiddenBird: PropTypes.number,
  onSelectedBird: PropTypes.func,
};

BirdsList.defaultProps = {
  currentLevel: 0,
  hiddenBird: 0,
  onSelectedBird: undefined,
};