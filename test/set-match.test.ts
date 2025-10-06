import { describe, it, expect } from "vitest";
import { Scoreboard } from "../src";

describe("setMatch", () => {
  it("Can set match", () => {
    const sb = new Scoreboard();
    sb.setMatch("Mexico", "Canada");
    const summary = sb.getSummary();

    expect(summary.length).toBe(1);
    expect(summary[0].home).toBe("Mexico");
    expect(summary[0].away).toBe("Canada");
  });

  it("Throws error when trying to set a duplicate match", () => {
    const sb = new Scoreboard();
    sb.setMatch("Mexico", "Canada");
    expect(() => sb.setMatch("Mexico", "Canada")).toThrowError();
  });

  it("Throws error when trying to set a match with a team currently playing", () => {
    const sb = new Scoreboard();
    sb.setMatch("Mexico", "Canada");
    expect(() => sb.setMatch("Mexico", "Argentina")).toThrowError();
    expect(() => sb.setMatch("Canada", "Argentina")).toThrowError();
  });

  it("Team name is case-insensitive", () => {
    const sb = new Scoreboard();
    sb.setMatch("Mexico", "Canada");
    expect(() => sb.setMatch("mexico", "ArGentinA")).toThrowError();
    expect(() => sb.setMatch("canadA", "argentina")).toThrowError();
  });
});
