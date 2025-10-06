import { describe, it, expect } from "vitest";
import { Scoreboard } from "../src";

describe("Finish match", () => {
  it("Remove match from scoreboard after finish", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Uruguay");
    sb.finishMatch(id);
    expect(sb.getMatchById(id)).toBe(undefined);
  });

  it("Can set new match with the same teams after finish previous match", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Uruguay");
    expect(() => sb.setMatch("Mexico", "Uruguay")).toThrowError();
    sb.finishMatch(id);
    const id2 = sb.setMatch("Mexico", "Uruguay");
    expect(sb.getMatchById(id2)!.id).toBe(id2);
  });
});
