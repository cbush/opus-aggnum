import mingo from "mingo";

export function runPipeline({ input, stages }) {
  if (stages.length === 0) {
    return [];
  }
  const pipeline = stages.map(stage => {
    const result = {};
    const { operator, argument } = stage;
    result[operator] = argument;
    return result;
  });
  const agg = new mingo.Aggregator(pipeline);
  return agg.run(input);
}
