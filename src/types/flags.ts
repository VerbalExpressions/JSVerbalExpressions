interface Flags {
  dotAll?: boolean;
  global?: boolean;
  ignoreCase?: boolean;
  multiline?: boolean;
  sticky?: boolean;
  unicode?: boolean;
}

const defaultFlags = {
  dotAll: false,
  global: true,
  ignoreCase: false,
  multiline: true,
  sticky: false,
  unicode: false
};

function isFlags(obj: any): obj is Flags {
  if (typeof obj !== "object") {
    return false;
  }

  if (obj instanceof RegExp) {
    return false;
  }

  const possibleFlags = Object.keys(defaultFlags);

  for (const key of Object.keys(obj)) {
    if (!(possibleFlags.includes(key))) {
      return false;
    }
  }

  return true;
}

function toFlagString(flags: Flags): string {
  const mapping = {
    dotAll: "s",
    global: "g",
    ignoreCase: "i",
    multiline: "m",
    sticky: "y",
    unicode: "u"
  };

  let flagsString = "";

  for (const [name, abbreviation] of Object.entries(mapping)) {
    if (flags[name] === true) {
      flagsString += abbreviation;
    }
  }

  return flagsString
    .split("")
    .sort()
    .join("");
}

export default Flags;
export {isFlags, defaultFlags, toFlagString};
