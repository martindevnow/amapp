import { toSeconds } from "./utilities";

describe("utilities", () => {
  describe("toSeconds", () => {
    it("works for 0:10", () => {
      const time = "0:10";
      const expected = 10;
      const actual = toSeconds(time);
      expect(actual).toBe(expected);
    });
    it("works for 10:10", () => {
      const time = "10:10";
      const expected = 10 * 60 + 10;
      const actual = toSeconds(time);
      expect(actual).toBe(expected);
    });
  });
});
