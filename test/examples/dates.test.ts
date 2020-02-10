import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterFrom, anyCharacterBut} from "../../src/character-classes";
import {digit} from "../../src/character-escapes";
import {concat} from "../../src/concat";
import {group} from "../../src/group";
import {lookahead} from "../../src/lookaround";
import {or} from "../../src/or";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

describe("dates", () => {
  // Please.
  // Don't do this in production.
  //
  // Instead, replace the hyphens with spaces and use `Date.parse`.

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const notAMultipleOfFour = or(
    concat(anyCharacterFrom([0, 2, 4, 6, 8]), anyCharacterBut([0, 4, 8])),
    concat(anyCharacterFrom([1, 3, 5, 7, 9]), anyCharacterBut([2, 6]))
  );

  const noIllegalXX00LeapDate = lookahead.negative(
    notAMultipleOfFour, "00-FEB-29"
  );

  const nineteenThroughNinetyNine = or(
    "19",
    concat(anyCharacterFrom([[2, 9]]), digit)
  );

  const noNonMultipleOfFourLeapDate = lookahead.negative(
    nineteenThroughNinetyNine, notAMultipleOfFour, "-FEB-29"
  );

  const noIllegalFebThirties = lookahead.negative(
    "FEB-3", anyCharacterFrom([0, 1])
  );

  const noIllegalThirtyFirsts = lookahead.negative(
    group.nonCapturing(or("APR", "JUN", "SEP", "NOV")), "-31"
  );

  const noZeroDates = lookahead.negative("00");

  const year = concat(
    nineteenThroughNinetyNine, digit, digit
  );

  const month = or(...months);

  const date = or(
    concat(anyCharacterFrom([[0, 2]]), anyCharacterFrom([[0, 9]])),
    concat(3, anyCharacterFrom([0, 1]))
  );

  const completeDate = VerEx(
    startOfLine,

    noIllegalXX00LeapDate, noNonMultipleOfFourLeapDate,
    group.named("year", year), "-",

    noIllegalFebThirties, noIllegalThirtyFirsts,
    group.named("month", month), "-",

    noZeroDates,
    group.named("date", date),

    endOfLine
  );

  expect(completeDate).toMatchString("1920-JAN-31");
  expect(completeDate).toMatchString("2001-NOV-21");
  expect(completeDate).toMatchString("2016-NOV-09");
  expect(completeDate).toMatchString("2024-AUG-31");
  expect(completeDate).toMatchString("1921-FEB-28");
  expect(completeDate).toMatchString("1920-FEB-28");
  expect(completeDate).toMatchString("9920-FEB-28");
  expect(completeDate).toMatchString("2920-FEB-28");

  it("should verify leap days", () => {
    expect(completeDate).toMatchString("1920-FEB-29");
    expect(completeDate).not.toMatchString("1921-FEB-29");
    expect(completeDate).not.toMatchString("1900-FEB-29");
    expect(completeDate).not.toMatchString("2900-FEB-29");
    expect(completeDate).toMatchString("2000-FEB-29");
  });

  it("should not match invalid days", () => {
    expect(completeDate).not.toMatchString("1920-NOV-00");
    expect(completeDate).not.toMatchString("1920-JAN-35");
  });

  it("should not match invalid months", () => {
    expect(completeDate).not.toMatchString("1920-FOO-28");
  });

  it("should not match days out of month range", () => {
    expect(completeDate).not.toMatchString("1920-FEB-30");
    expect(completeDate).not.toMatchString("1920-FEB-31");
    expect(completeDate).not.toMatchString("1920-APR-31");
  });

  it("should not match dates beyond the year limits", () => {
    expect(completeDate).not.toMatchString("1820-NOV-02");
    expect(completeDate).not.toMatchString("1857-JAN-01");
    expect(completeDate).not.toMatchString("10000-JAN-01");
  });

  it("should correctly group components", () => {
    const {groups} = completeDate.exec("1971-JAN-01");

    expect(groups.year).toEqual("1971");
    expect(groups.month).toEqual("JAN");
    expect(groups.date).toEqual("01");
  });
});
