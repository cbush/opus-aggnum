import React from "react";
import { useDrag } from "react-dnd";

function Tool({ name, type }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { name, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <div ref={dragRef} className="tool" style={{ opacity }}>
      {name}
    </div>
  );
}

export function Toolbox({ toolsSpec }) {
  const tools = [];
  Object.keys(toolsSpec).forEach(name => {
    for (let i = 0; i < toolsSpec[name]; ++i) {
      tools.push({
        name,
        type: "stage"
      });
    }
  });
  return (
    <div className="toolbox">
      <label>TOOLBOX</label>
      <div className="tray">
        {tools.map(tool => (
          <Tool {...tool} />
        ))}
      </div>
    </div>
  );
}
