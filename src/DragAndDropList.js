import React from "react";
import DragAndDropColorBox from "./DragAndDropColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DragAndDropList = SortableContainer(({ colors, handleDeleteColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, idx) => (
        <DragAndDropColorBox
          index={idx}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => handleDeleteColor(color.name)}
        />
      ))}
    </div>
  );
});
export default DragAndDropList;

