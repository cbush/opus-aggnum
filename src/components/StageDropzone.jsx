import React from "react";
import { useDrop } from "react-dnd";
import { useLiveRef } from "../useLiveRef";

export function StageDropzone(props) {
  const propsRef = useLiveRef(props);
  const [{ canDrop, isOver, didDrop }, drop] = useDrop({
    accept: "stage",
    drop: () => {
      const { onDrop } = propsRef.current;
      return { name: "dropzone", onDrop };
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      didDrop: monitor.didDrop()
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
    <>
      {canDrop ? (
        <div ref={drop} className={`${className.join(" ")}`}>
          {isActive ? "Release to drop" : "Drag a stage here"}
        </div>
      ) : didDrop ? (
        <div className={"dropzone"}>
          <br />
        </div>
      ) : null}
    </>
  );
}
