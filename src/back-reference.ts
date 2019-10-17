import RawExpression from "./types/raw-expression";

function backReference(reference: number | string) {
  if (typeof reference === "number") {
    return new RawExpression(`\\${reference}`);
  }

  if (typeof reference === "string") {
    return new RawExpression(`\\k<${reference}>`);
  }
}

export default backReference;
