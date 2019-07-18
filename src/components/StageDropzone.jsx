import React from "react";
import { useDrop } from "react-dnd";
import { useLiveRef } from "../useLiveRef";

export function StageDropzone(props) {
  const propsRef = useLiveRef(props);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "stage",
    drop: () => {
      const { onDrop } = propsRef.current;
      return { name: "dropzone", onDrop };
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = canDrop && isOver;
  const className = ["dropzone"];
  if (isActive) {
    className.push("active");
  } else if (canDrop) {
    className.push("available");
  }
  return (
    <div ref={drop} className={`${className.join(" ")}`}>
      {isActive ? "Release to drop" : "Drag a box here"}
    </div>
  );
}
