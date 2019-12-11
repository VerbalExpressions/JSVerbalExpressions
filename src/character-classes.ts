import Set, {setToFragment} from "./types/set";
import Fragment from "./types/fragment";

function anyCharacterFrom(set: Set): Fragment {
  const setAsFragment = setToFragment(set);
  return new Fragment(`[${setAsFragment}]`);
}

function anyCharacterBut(set: Set): Fragment {
  const setAsFragment = setToFragment(set);
  return new Fragment(`[^${setAsFragment}]`);
}

export {anyCharacterFrom, anyCharacterBut};
