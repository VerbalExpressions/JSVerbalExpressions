interface Flags {
  dotAll?: boolean;
  global?: boolean;
  ignoreCase?: boolean;
  multiline?: boolean;
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
    "dotAll", "global", "ignoreCase", "multiline", "sticky", "unicode"
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

  if (flags.dotAll === true) { flagsString += "s"; }
  if (flags.global === true) { flagsString += "g"; }
  if (flags.ignoreCase === true) { flagsString += "i"; }
  if (flags.multiline === true) { flagsString += "m"; }
  if (flags.sticky === true) { flagsString += "y"; }
  if (flags.unicode === true) { flagsString += "u"; }

  return flagsString.split("").sort().join("");
}

export default Flags;
export { isFlags, toFlagString };
