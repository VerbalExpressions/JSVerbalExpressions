import Fragment from "./types/fragment";

function backReference(reference: number | string): Fragment {
  if (typeof reference === "number") {
    return new Fragment(`\\${reference}`);
  }

  return new Fragment(`\\k<${reference}>`);
}

export default backReference;
