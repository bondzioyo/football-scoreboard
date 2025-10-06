import { v4 as uuidv4 } from "uuid";
import { IScoreboard, Match, MatchInternal } from "./types";

class Scoreboard implements IScoreboard {
  private matches = new Map<string, MatchInternal>();
  private currentlyPlayingTeams = new Map<string, string>();

  setMatch(home: string, away: string) {
    const homeCaseInsensitive = home.toLowerCase();
    const awayCaseInsensitive = away.toLowerCase();

    if (
      this.currentlyPlayingTeams.has(homeCaseInsensitive) ||
      this.currentlyPlayingTeams.has(awayCaseInsensitive)
    )
      throw new Error("At lest one of the teams is playing a match");

    const homeId = uuidv4();
    const awayId = uuidv4();

    const id = `${homeId}_${awayId}`;
    const newMatch: MatchInternal = {
      id,
      home,
      away,
      scoreHome: 0,
      scoreAway: 0,
      createdAt: Date.now(),
    };

    this.matches.set(id, newMatch);

    this.currentlyPlayingTeams.set(homeCaseInsensitive, homeId);
    this.currentlyPlayingTeams.set(awayCaseInsensitive, awayId);

    return id;
  }

  getMatchById(id: string): Readonly<Match> | undefined {
    const match = this.matches.get(id);
    return match;
  }

  getMatchByTeamNames(home: string, away: string): Readonly<Match> | undefined {
    const homeCaseInsensitive = home.toLowerCase();
    const awayCaseInsensitive = away.toLowerCase();
    const homeId = this.currentlyPlayingTeams.get(homeCaseInsensitive);
    const awayId = this.currentlyPlayingTeams.get(awayCaseInsensitive);
    const id = `${homeId}_${awayId}`;
    const match = this.matches.get(id);
    return match;
  }

  updateScore(id: string, scoreHome?: number, scoreAway?: number) {
    const match = this.matches.get(id);

    if (!match) throw new Error("Match not found");

    if (scoreHome !== undefined && scoreHome < match.scoreHome) {
      throw new Error(
        `Updated home score (${scoreHome}) cannot be lower than current score (${match.scoreHome})`
      );
    }

    if (scoreAway !== undefined && scoreAway < match.scoreAway) {
      throw new Error(
        `Updated away score (${scoreAway}) cannot be lower than current score (${match.scoreAway})`
      );
    }

    match["scoreHome"] = scoreHome ?? match.scoreHome;
    match["scoreAway"] = scoreAway ?? match.scoreAway;
    match["updatedAt"] = Date.now();
  }

  finishMatch(id: string): void {
    const match = this.matches.get(id);
    if (!match) throw new Error("Match not found");
    this.currentlyPlayingTeams.delete(match.home.toLowerCase());
    this.currentlyPlayingTeams.delete(match.away.toLowerCase());
    this.matches.delete(id);
  }

  getSummary(): ReadonlyArray<Match> {
    return Array.from(this.matches.values())
      .sort((a, b) => {
        const goalsA = a.scoreAway + a.scoreHome;
        const goalsB = b.scoreAway + b.scoreHome;
        if (goalsA !== goalsB) return goalsB - goalsA;
        return b.createdAt - a.createdAt;
      })
      .map((m) => Object.freeze(m));
  }
}

export { Scoreboard };
