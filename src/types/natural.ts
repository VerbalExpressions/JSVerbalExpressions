/**
 * A natural number.
 *
 * A positive integer. For our purposes, 0 is a natural number too.
 */
type Natural = number;

function isNatural(n: any): n is Natural {
  if (!Number.isInteger(n)) {
    return false;
  }

  if (n < 0) {
    return false;
  }

  return true;
}

export default Natural;
export {isNatural};
