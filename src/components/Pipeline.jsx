import React from "react";
import { Stage } from "./Stage";
import { runPipeline } from "../runPipeline";
export function Pipeline({ input, stages, setStages }) {
  const results = [];
  const inputs = [];

  try {
    let nextInput = input;
    stages.map(stage => {
      inputs.push(nextInput);
      nextInput = runPipeline({ input: nextInput, stages: [stage] });
      results.push(nextInput);
    });
  } catch (error) {
    // Do nothing
  }

  return (
    <div className="pipeline">
      {stages.map((stage, index) => {
        const result = results[index];
        return (
          <Stage
            key={index}
            input={inputs[index]}
            results={result}
            onRequestDelete={() => {
              const newStages = [...stages];
              newStages.splice(index, 1);
              setStages(newStages);
            }}
            setStage={stage => {
              const newStages = [...stages];
              newStages[index] = stage;
              setStages(newStages);
            }}
            flowStatus={result ? "working" : "broken"}
            {...stage}
          />
        );
      })}
    </div>
  );
}
