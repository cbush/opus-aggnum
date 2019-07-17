import React from "react";
import { Collection } from "./Collection";
export function Result({ input, expected }) {
  return (
    <div className="result">
      <Collection name={"Output"} documents={input} />
      <Collection name={"Expected"} documents={expected} />
    </div>
  );
}
