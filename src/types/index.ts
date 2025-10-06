export interface MatchInternal {
  readonly id: string;
  readonly home: string;
  readonly away: string;
  scoreHome: number;
  scoreAway: number;
  createdAt: number;
  updatedAt?: number;
}

export interface Match {
  readonly id: string;
  readonly home: string;
  readonly away: string;
  readonly scoreHome: number;
  readonly scoreAway: number;
  readonly createdAt: number;
  readonly updatedAt?: number;
}

export interface IScoreboard {
  setMatch(home: string, away: string): string;
  getSummary(): ReadonlyArray<Match>;
}
