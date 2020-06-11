import React from 'react'
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom"
import './PaletteList.css'

class PaletteList extends React.Component {

  render() {
    const { palettes } = this.props

    return (
      <div className="palettelist-container">
        <div className="wrapper">
          <nav className="palettelist-nav">
            <h1>Color Palettes</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className="palettes">
            {palettes.map(palette => (
              <Link to={`palette/${palette.id}`}>
                <MiniPalette {...palette} style />
              </Link>

            ))}
          </div>
        </div>
      </div >
    )
  }
}

export default PaletteList