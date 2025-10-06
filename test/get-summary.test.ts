import { describe, expect, it, vi } from "vitest";
import { Scoreboard } from "../src";

const scores = [
  { home: "Mexico", away: "Canada", homeScore: 0, awayScore: 5 },
  { home: "Spain", away: "Brazil", homeScore: 10, awayScore: 2 },
  { home: "Germany", away: "France", homeScore: 2, awayScore: 2 },
  { home: "Uruguay", away: "Italy", homeScore: 6, awayScore: 6 },
  { home: "Argentina", away: "Australia", homeScore: 3, awayScore: 1 },
];

const expectedOrder = [
  { home: "Uruguay", away: "Italy", homeScore: 6, awayScore: 6 },
  { home: "Spain", away: "Brazil", homeScore: 10, awayScore: 2 },
  { home: "Mexico", away: "Canada", homeScore: 0, awayScore: 5 },
  { home: "Argentina", away: "Australia", homeScore: 3, awayScore: 1 },
  { home: "Germany", away: "France", homeScore: 2, awayScore: 2 },
];

describe("Get summary", () => {
  it("Summary returned in correct order", () => {
    const sb = new Scoreboard();
    let fakeTime = Date.now();
    for (const score of scores) {
      const spy = vi
        .spyOn(global.Date, "now")
        .mockImplementationOnce(() => (fakeTime += 1));
      const id = sb.setMatch(score.home, score.away);
      sb.updateScore(id, score.homeScore, score.awayScore);
    }

    const summary = sb.getSummary();
    for (const [i, score] of expectedOrder.entries()) {
      expect(summary[i].home).toBe(score.home);
      expect(summary[i].away).toBe(score.away);
    }
  });
});
