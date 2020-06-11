import React from "react";
import './DragAndDropColorBox.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { SortableElement } from "react-sortable-hoc";



const DragAndDropColorBox = SortableElement(props => {
  return (

    <div className="draganddropbox" style={{ backgroundColor: props.color }}>
      <div className="draganddropbox-container">
        <span className="draganddropbox-name">{props.name} </span>
        <span className="delete-icon">
          <DeleteForeverIcon onClick={props.handleClick} /></span>

      </div>
    </div>
  )
})
export default DragAndDropColorBox