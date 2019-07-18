import React from "react";
import { useDrag } from "react-dnd";
import { useLiveRef } from "../useLiveRef";

export function Tool(props) {
  const { id, name, type } = props;
  const propsRef = useLiveRef(props);
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
      result.onDrop(item);
      const { onDropped } = propsRef.current;
      onDropped();
    }
  });
  return (
    <div ref={dragRef} className="tool" style={{ opacity }}>
      {name}
    </div>
  );
}
