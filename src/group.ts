import Expression from "./types/expression";
import Fragment, {fragmentsFromExpressions, joinFragments} from "./types/fragment";

function group(...expressions: Expression[]): Fragment {
  const fragments = fragmentsFromExpressions(expressions);
  const combined = joinFragments(fragments);

  return new Fragment(`(${combined})`);
}

group.named = (name: string, ...expressions: Expression[]): Fragment => {
  const fragments = fragmentsFromExpressions(expressions);
  const combined = joinFragments(fragments);

  return new Fragment(`(?<${name}>${combined})`);
};

group.capturing = group;

group.capturing.named = group.named;

group.nonCapturing = (...expressions: Expression[]): Fragment => {
  const fragments = fragmentsFromExpressions(expressions);
  const combined = joinFragments(fragments);

  return new Fragment(`(?:${combined})`);
};

function backReference(reference: number | string): Fragment {
  if (typeof reference === "number") {
    return new Fragment(`\\${reference}`);
  }

  return new Fragment(`\\k<${reference}>`);
}

export {group, backReference};
