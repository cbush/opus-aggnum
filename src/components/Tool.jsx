import React from "react";
import { useDrag } from "react-dnd";

export function Tool({ id, name, type }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { id, name, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return;
      }
      const result = monitor.getDropResult();
      console.log("Dropped item:", item);
      result.onDrop(item);
    }
  });
  return (
    <div ref={dragRef} className="tool" style={{ opacity }}>
      {name}
    </div>
  );
}
