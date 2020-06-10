import React from "react";
import './DragAndDropColorBox.css'
// import { SortableElement } from "react-sortable-hoc";
// import { withStyles } from "@material-ui/styles";
// import DeleteIcon from "@material-ui/icons/Delete";
// import styles from "./styles/DraggableColorBoxStyles";

function DragAndDropColorBox(props) {
  return (
    <div className="draganddropboxd-container">
      <div className="draganddropbox" style={{ backgroundColor: props.color }}>
        {props.name}
      </div>
    </div>
  )
}
export default DragAndDropColorBox