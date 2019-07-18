import React from "react";
import { Stage } from "./Stage";
import { runPipeline } from "../runPipeline";
import { Result } from "./Result";
import { StageDropzone } from "./StageDropzone";

export function Pipeline({ input, stages, setStages, releaseTool }) {
  const results = [];
  const inputs = [];

  try {
    let nextInput = input;
    stages.forEach(stage => {
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
        const stageResults = results[index];
        return (
          <>
            <Stage
              key={stage.id}
              input={inputs[index]}
              onRequestDelete={() => {
                const newStages = [...stages];
                newStages.splice(index, 1);
                setStages(newStages);
                releaseTool({
                  id: stage.id,
                  name: stage.operator,
                  type: "stage"
                });
              }}
              setStage={stage => {
                const newStages = [...stages];
                newStages[index] = stage;
                setStages(newStages);
              }}
              flowStatus={
                inputs[index] == null
                  ? "starving"
                  : stageResults
                  ? "working"
                  : "broken"
              }
              {...stage}
            />
            {stageResults ? <Result input={stageResults} /> : null}
          </>
        );
      })}
      <StageDropzone
        onDrop={({ id, name, onRemovedFromPipeline }) => {
          const newStages = [
            ...stages,
            {
              id,
              operator: name
            }
          ];
          setStages(newStages);
        }}
      />
    </div>
  );
}
