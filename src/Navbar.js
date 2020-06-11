import React from 'react'
import Slider from 'rc-slider';
import { Link } from 'react-router-dom'
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import 'rc-slider/assets/index.css';
import './Navbar.css'

class Navbar extends React.Component {
  render() {
    // const { level, changeLevel } = this.props
    return (
      <header>
        <div className="Navbar">
          <div className="goBack">
            <Link to='/'>
              ⏎ Back</Link>
          </div>
        </div>
        {/* <div className="slider">
          <div className="level-details">Level: {level}</div>
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel} />
        </div> */}
        {/* <div className="select-container">
          <Select onChange={this.state.changeFormat}>
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </div> */}
      </header>
    )
  }
}

export default Navbar