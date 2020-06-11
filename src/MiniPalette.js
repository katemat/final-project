import React from "react";
import './MiniPalette.css'
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
      <div className="minicolors-wrapper">
        <h5 className="minicolorboxname">{paletteName} </h5>
        {/* <span className="delete-icon">
          <DeleteForeverIcon onClick={props.handleDelete} /></span> */}
      </div>
    </div>
  )

}

export default MiniPalette;