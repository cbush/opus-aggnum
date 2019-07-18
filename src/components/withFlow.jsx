import React from "react";
export function withFlow(Component) {
  return props => {
    let { flowStatus } = props;
    const className = (props.className || "").split(" ");
    switch (flowStatus) {
      case "working":
        className.push("flowing working");
        break;
      case "broken":
        className.push("flowing broken");
        break;
      case "starving":
        className.push("flowing starving");
        break;
      default:
        break;
    }
    return <Component {...props} className={className.join(" ")} />;
  };
}
