import React from "react";
import { Flipped } from "react-flip-toolkit";
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
          <React.Fragment key={stage.id}>
            <Stage
              id={stage.id}
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
            {stageResults && index !== stages.length - 1 ? (
              <>
                <div className="arrowRight" />
                <Result
                  name="Output from Previous Stage"
                  input={stageResults}
                />
              </>
            ) : null}
            <div className="arrowRight" />
          </React.Fragment>
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
