interface Flags {
  caseInsensitive?: boolean;
  dotAll?: boolean;
  global?: boolean;
  multiLine?: boolean;
  sticky?: boolean;
  unicode?: boolean;
}

function isFlags(obj: any): obj is Flags {
  if (typeof obj !== "object") {
    return false;
  }

  if (obj instanceof RegExp) {
    return false;
  }

  const possibleFlags = [
    "caseInsensitive", "dotAll", "global", "multiLine", "sticky", "unicode"
  ];

  for (const key of Object.keys(obj)) {
    if (!(possibleFlags.includes(key))) {
      return false;
    }
  }

  return true;
}

function toFlagString(flags: Flags): string {
  let flagsString = "";

  if (flags.global === true) { flagsString += "g"; }
  if (flags.caseInsensitive === true) { flagsString += "i"; }
  if (flags.multiLine === true) { flagsString += "m"; }
  if (flags.dotAll === true) { flagsString += "s"; }
  if (flags.unicode === true) { flagsString += "u"; }
  if (flags.sticky === true) { flagsString += "y"; }

  return flagsString;
}

export default Flags;
export { isFlags, toFlagString };
