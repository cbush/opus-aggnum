import React from "react";
import { Collection } from "./Collection";
import { Document } from "./Document";
export function Result({ input, expected }) {
  return (
    <div className="result">
      {Array.isArray(input) ? (
        <Collection name="Results" documents={input} />
      ) : (
        <Document document={input} />
      )}
      {expected ? <Collection name={"Expected"} documents={expected} /> : null}
    </div>
  );
}
