import React from "react";
import { Collection } from "./Collection";

export function InputCollections({ input }) {
  return (
    <div className="inputCollections">
      <Collection documents={input} />
    </div>
  );
}
