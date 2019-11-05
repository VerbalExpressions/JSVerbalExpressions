import VerEx from "../src/verex";
import "./custom-matchers";

describe("caseInsensitive", () => {
  describe("caseInsensitive: true", () => {
    it.todo("should allow case insensitive matches");
  });

  describe("caseInsensitive: false", () => {
    it.todo("should not allow case insensitive matches");
  });
});

describe("dotAll", () => {
  describe("dotAll: true", () => {
    it.todo("should allow `.` to match line separators");
  });

  describe("dotAll: false", () => {
    it.todo("should not allow `.` to match line separators");
  });
});

describe("global", () => {
  describe("global: true", () => {
    it.todo("should allow matching all occurrences");
  });

  describe("global: false", () => {
    it.todo("should stop matching after first occurrence");
  });
});

describe("multiLine", () => {
  describe("multiLine: true", () => {
    it.todo("should make line anchors match start and end of each line");
  });

  describe("multiLine: false", () => {
    it.todo("should make line anchors match start and end of the string");
  });
});

describe("sticky", () => {
  describe("sticky: true", () => {
    it.todo("should begin matching from lastIndex");
    it.todo("should should override the global flag");
  });

  describe("sticky: false", () => {
    it.todo("should begin matching from the beginning of the string");
  });
});

describe("unicode", () => {
  describe("unicode: true", () => {
    it.todo("should allow `.` to match astral symbols");
    it.todo("should make quantifiers to apply to whole symbols");
    it.todo("should allow character classes to match astral symbols");
    it.todo("should allow `\\D`, `\\S`, `\\W` to match astral symbols");
    it.todo("should permit unicode property escapes");
    it.todo("should allow code point escapes");
  });

  describe("unicode: false", () => {
    it.todo("should not allow `.` to match astral symbols");
    it.todo("should make quantifiers apply to lower surrogates of astral symbols");
    it.todo("should not allow character classes to match astral symbols");
    it.todo("should not allow `\\D`, `\\S`, `\\W` to match astral symbols");
    it.todo("should not permit unicode property escapes");
    it.todo("should not allow code point escapes");
  });
});
