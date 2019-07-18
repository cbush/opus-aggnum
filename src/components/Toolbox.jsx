import React from "react";
import { Tool } from "./Tool";

export function Toolbox({ tools, setTools }) {
  return (
    <div className="toolbox">
      <label>STAGES TOOLBOX</label>
      <div className="tray">
        {tools.map((tool, index) => (
          <Tool
            key={tool.id}
            {...tool}
            onDropped={() => {
              const newTools = [...tools];
              newTools.splice(index, 1);
              setTools(newTools);
            }}
          />
        ))}
      </div>
    </div>
  );
}
