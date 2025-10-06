import { v4 as uuidv4 } from "uuid";
import { IScoreboard, Match, MatchInternal } from "./types";

class Scoreboard implements IScoreboard {
  private matches = new Map<string, MatchInternal>();
  private currentlyPlayingTeams = new Set<string>();

  setMatch(home: string, away: string) {
    const homeCaseInsensitive = home.toLowerCase();
    const awayCaseInsensitive = away.toLowerCase();

    if (
      this.currentlyPlayingTeams.has(homeCaseInsensitive) ||
      this.currentlyPlayingTeams.has(awayCaseInsensitive)
    )
      throw new Error("At lest one of the teams is playing a match");

    const id = uuidv4();
    const newMatch: MatchInternal = {
      id,
      home,
      away,
      scoreHome: 0,
      scoreAway: 0,
      createdAt: Date.now(),
    };

    this.matches.set(id, newMatch);

    this.currentlyPlayingTeams.add(homeCaseInsensitive);
    this.currentlyPlayingTeams.add(awayCaseInsensitive);

    return id;
  }

  getMatchById(id: string): Readonly<Match> | undefined {
    const match = this.matches.get(id);
    return match;
  }

  getSummary(): ReadonlyArray<Match> {
    return Array.from(this.matches.values()).map((m) => Object.freeze(m));
  }
}

export { Scoreboard };
