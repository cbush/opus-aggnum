import React from "react";
import { Button } from "reakit";
export function PipelineControls({ onAddClicked }) {
  return (
    <div className="pipelineControls">
      <Button onClick={onAddClicked}>Add Pipeline Stage</Button>
    </div>
  );
}
