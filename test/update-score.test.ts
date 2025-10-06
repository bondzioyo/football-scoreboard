import { describe, it, expect } from "vitest";
import { Scoreboard } from "../src";

describe("Update score", () => {
  it("Update either homeScore and awayScore", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    sb.updateScore(id, 1, 1);
    const match = sb.getMatchById(id);
    expect(match!.scoreHome).toBe(1);
    expect(match!.scoreAway).toBe(1);
  });

  it("Update only homeScore", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    sb.updateScore(id, 1);
    const match = sb.getMatchById(id);
    expect(match!.scoreHome).toBe(1);
    expect(match!.scoreAway).toBe(0);
  });

  it("Update only awayScore", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    sb.updateScore(id, undefined, 1);
    const match = sb.getMatchById(id);
    expect(match!.scoreHome).toBe(0);
    expect(match!.scoreAway).toBe(1);
  });

  it("Updated result cannot be lower", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    sb.updateScore(id, 1, 1);
    expect(() => sb.updateScore(id, 0, 1)).toThrowError();
  });

  it("Cannot update non existing match", () => {
    const sb = new Scoreboard();
    const id = "non_existing_match_id";
    expect(() => sb.updateScore(id, 1, 1)).toThrowError("Match not found");
  });

  it("updateAt property is set", () => {
    const sb = new Scoreboard();
    const id = sb.setMatch("Mexico", "Canada");
    const match = sb.getMatchById(id);
    expect(match?.updatedAt).toBe(undefined);
    sb.updateScore(id, 1, 1);
    expect(typeof match!.updatedAt).toBe("number");
  });
});
