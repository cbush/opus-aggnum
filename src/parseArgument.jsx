import JSON5 from "json5";
export function parseArgument(argument) {
  return JSON5.parse(argument);
}
