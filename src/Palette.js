import React from 'react'
import ColorBox from './ColorBox'
import './Palette.css'
import Navbar from './Navbar'


class Palette extends React.Component {
  state = {
    level: 500
  }

  changeLevel = (newLevel) => {
    this.setState({
      level: newLevel
    })
  }

  render() {
    const { colors } = this.props.palette
    const { level } = this.state
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ))
    return (
      <div className="Palette">
        <Navbar level={level} changeLevel={this.changeLevel} />

        <div className="Palette-colorBoxes">
          {colorBoxes}
        </div>

      </div>
    )
  }
}

export default Palette