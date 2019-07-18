import mingo from "mingo";
import { parseArgument } from "./parseArgument";

export function runPipeline({ input, stages }) {
  if (stages.length === 0) {
    return [];
  }
  const pipeline = stages.map(({ operator, argument }) => {
    const result = {};
    result[operator] = parseArgument(argument);
    return result;
  });
  const agg = new mingo.Aggregator(pipeline);
  return agg.run(input);
}
