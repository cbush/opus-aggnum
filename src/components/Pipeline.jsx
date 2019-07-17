import React from "react";
import { Stage } from "./Stage";

export function Pipeline({ stages, setStages }) {
  return (
    <div className="pipeline">
      {stages.map((stage, index) => (
        <Stage
          key={index}
          onRequestDelete={() => {
            const newStages = [...stages];
            newStages.splice(index, 1);
            setStages(newStages);
          }}
          {...stage}
        />
      ))}
    </div>
  );
}
