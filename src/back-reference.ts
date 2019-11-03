import Fragment from "./types/fragment";

function backReference(reference: number | string): Fragment {
  if (typeof reference === "number") {
    return new Fragment(`\\${reference}`);
  }

  if (typeof reference === "string") {
    return new Fragment(`\\k<${reference}>`);
  }
}

export default backReference;
