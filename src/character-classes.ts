import Set, {setToString} from "./types/set";
import Fragment from "./types/fragment";

function anyCharacterFrom(set: Set): Fragment {
  const setString = setToString(set);
  return new Fragment(`[${setString}]`);
}

function anyCharacterBut(set: Set): Fragment {
  const setString = setToString(set);
  return new Fragment(`[^${setString}]`);
}

export {anyCharacterFrom, anyCharacterBut};
