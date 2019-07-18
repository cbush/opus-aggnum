import React from "react";
import uuidv1 from "uuid/v1";
import { Tool } from "./Tool";

export function Toolbox({ toolsSpec }) {
  const tools = [];
  Object.keys(toolsSpec).forEach(name => {
    for (let i = 0; i < toolsSpec[name]; ++i) {
      tools.push({
        id: uuidv1(),
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
