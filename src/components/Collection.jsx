import React from "react";
import { Document } from "./Document";
export function Collection({ documents, name }) {
  return (
    <div className="collection">
      {name != null ? <label>{name}</label> : null}
      <div className="documents">
        {documents.map((document, index) => (
          <Document key={index} document={document} />
        ))}
      </div>
    </div>
  );
}
