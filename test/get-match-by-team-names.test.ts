import { describe } from "node:test";
import { expect, it } from "vitest";
import { Scoreboard } from "../src";

describe("Get match by team names", () => {
  it("Can get a match", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    const match = sb.getMatchByTeamNames("Mexico", "Canada");
    expect(match!.home).toBe("Mexico");
    expect(match!.away).toBe("Canada");
    expect(match!.id).toBe(id);
  });

  it("Returns undefined when match with given home and away is not in progress", () => {
    const sb = new Scoreboard();
    sb.setMatch("Mexico", "Canada");
    sb.setMatch("Spain", "Brasil");
    expect(sb.getMatchByTeamNames("Mexico", "Brasil")).toBe(undefined);
    expect(sb.getMatchByTeamNames("Spain", "Germany")).toBe(undefined);
  });

  it("Returns undefined when the home team and the away team are swapped", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    expect(sb.getMatchByTeamNames("Canada", "Mexico")).toBe(undefined);
  });

  it("Team names are case-insensitive", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    const match = sb.getMatchByTeamNames("meXiCo", "CanadA");
    expect(match!.home).toBe("Mexico");
    expect(match!.away).toBe("Canada");
    expect(match!.id).toBe(id);
  });
});
