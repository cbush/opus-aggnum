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
  const result = runPipeline({ input, stages });
  const resultEqualsExpected = deepEqual(result, expectedOutput);
  const dialog = useDialogState();
  return (
    <>
      <div className="section">
        <InputCollections input={input} />
      </div>
      <div className="section">
        <PipelineControls
          onAddClicked={() => {
            setStages([
              ...stages,
              {
                operator: "$match",
                argument: { shape: "triangle" }
              }
            ]);
          }}
        />
        <Pipeline input={input} stages={stages} setStages={setStages} />
      </div>
      <div className="section">
        <Result input={result} expected={expectedOutput} />
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
