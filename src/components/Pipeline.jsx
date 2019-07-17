import React from "react";

function Stage({ stage }) {
  return (
    <div className="stage">
      <p>I am a stage</p>
    </div>
  );
}

export function Pipeline({ stages, setStages }) {
  return (
    <div className="pipeline">
      {stages.map((stage, index) => (
        <Stage key={index} stage={stage} />
      ))}
    </div>
  );
}
