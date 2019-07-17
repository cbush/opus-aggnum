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
import { runPipeline } from "./runPipeline";

export function Game({ level }) {
  const [stages, setStages] = useState([]);
  const { input, expectedOutput } = level;
  const result = runPipeline({ input, stages });
  const resultEqualsExpected = deepEqual(result, expectedOutput);
  const dialog = useDialogState();
  return (
    <>
      <InputCollections input={input} />
      <PipelineControls
        onAddClicked={() => {
          stages.push({});
          setStages(stages);
        }}
      />
      <Pipeline input={input} stages={[]} setStages={setStages} />
      <Result input={result} expected={expectedOutput} />
      <>
        <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
        <DialogBackdrop {...dialog} />
        <Dialog disabled={!resultEqualsExpected} {...dialog}>
          Success!
        </Dialog>
      </>
    </>
  );
}
