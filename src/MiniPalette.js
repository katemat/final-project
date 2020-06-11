import React from "react";
import './MiniPalette.css'

function MiniPalette(props) {
  const { paletteName, colors } = props
  const miniColorBoxes = colors.map(color => (
    <div className='minicolorbox'
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ))

  return (
    <div className="minicolors-container">
      <div className="colors">{miniColorBoxes}</div>
      <h5 className="minicolorboxname">{paletteName} </h5>
    </div>
  )

}

export default MiniPalette;