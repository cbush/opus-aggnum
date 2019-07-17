import React, { useState } from "react";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop
} from "reakit";
import deepEqual from "deep-equal";

import { InputCollections } from "./InputCollections";
import { PipelineControls } from "./PipelineControls";
import { Pipeline } from "./Pipeline";
import { Result } from "./Result";
import { runPipeline } from "../runPipeline";

export function Game({ level }) {
  const [stages, setStages] = useState([]);
  const { input, expectedOutput } = level;
  let resultEqualsExpected = false;
  let result = [];
  try {
    result = runPipeline({ input, stages });
    resultEqualsExpected = deepEqual(result, expectedOutput);
  } catch (error) {
    // do nothing
  }
  const dialog = useDialogState();
  return (
    <>
      <div className="section">
        <InputCollections input={input} />
      </div>
      <div className="arrowDown" />
      <div className="section">
        <PipelineControls
          onAddClicked={() => {
            setStages([...stages, {}]);
          }}
        />
        <Pipeline input={input} stages={stages} setStages={setStages} />
      </div>
      <div className="section">
        <Result
          resultEqualsExpected={resultEqualsExpected}
          input={result}
          expected={expectedOutput}
        />
        <>
          <DialogDisclosure disabled={!resultEqualsExpected} {...dialog}>
            Submit
          </DialogDisclosure>
          <DialogBackdrop {...dialog} />
          <Dialog {...dialog}>Success!</Dialog>
        </>
      </div>
    </>
  );
}
