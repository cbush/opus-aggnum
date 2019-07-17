import React from "react";

function Stage({ operator, argument }) {
  return (
    <div className="stage">
      <p>
        <span className="operator">{operator}</span>:
        <span className="argument">{JSON.stringify(argument)}</span>
      </p>
    </div>
  );
}

export function Pipeline({ stages, setStages }) {
  return (
    <div className="pipeline">
      {stages.map((stage, index) => (
        <Stage key={index} {...stage} />
      ))}
    </div>
  );
}
