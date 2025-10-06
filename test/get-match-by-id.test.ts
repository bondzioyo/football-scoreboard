import { describe } from "node:test";
import { expect, it } from "vitest";
import { Scoreboard } from "../src";

describe("Get match by id", () => {
  it("Can get a match", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    const match = sb.getMatchById(id);
    expect(match!.home).toBe("Mexico");
    expect(match!.away).toBe("Canada");
    expect(match!.id).toBe(id);
  });

  it("Returns undefined when match with given id doesn't exist", () => {
    const sb = new Scoreboard();
    expect(sb.getMatchById("abc")).toBe(undefined);
  });
});
