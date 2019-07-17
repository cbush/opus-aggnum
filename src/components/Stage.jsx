import React from "react";
import { Button } from "reakit";
export function Stage({ operator, argument, onRequestDelete }) {
  return (
    <div className="stage">
      <p>
        <span className="operator">{operator}</span>:
        <span className="argument">{JSON.stringify(argument)}</span>
      </p>
      <Button className="deleter" onClick={onRequestDelete}>
        x
      </Button>
    </div>
  );
}
