import React from "react";
import { Document } from "./Document";
import { withFlow } from "./withFlow";

export const Collection = withFlow(({ documents, name, className }) => {
  return (
    <div className={`collection ${className}`}>
      {name != null ? <label>{name}</label> : null}
      <div className="documents">
        {documents.length === 0 ? (
          <p>
            <i>(Nothing yet)</i>
          </p>
        ) : (
          documents.map((document, index) => (
            <Document key={index} document={document} />
          ))
        )}
      </div>
    </div>
  );
});
