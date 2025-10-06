export interface MatchInternal {
  /** Unique match identifier */
  readonly id: string;

  /** Home team name */
  readonly home: string;

  /** Away team name */
  readonly away: string;

  /** Home team score */
  scoreHome: number;

  /** Away team score */
  scoreAway: number;

  /** Timestamp of match creation */
  createdAt: number;

  /** Timestamp of last update */
  updatedAt?: number;
}

/**
 * Represents the summary of a single match.
 */
export interface Match {
  /** Unique match identifier */
  readonly id: string;

  /** Home team name */
  readonly home: string;

  /** Away team name */
  readonly away: string;

  /** Home team score */
  readonly scoreHome: number;

  /** Away team score */
  readonly scoreAway: number;

  /** Timestamp of match creation */
  readonly createdAt: number;

  /** Timestamp of last update */
  readonly updatedAt?: number;
}

/**
 * Class that manages matches in the Scoreboard.
 */
export interface IScoreboard {
  /**
   * Creates a new match and returns its ID
   * @param {string} home Home team name
   * @param {string} away Away team name
   * @returns ID of the created match
   */
  setMatch(home: string, away: string): string;

  /**
   * Retrieves a single match by its ID
   * @param id ID of the match to retrieve
   * @returns A read-only Match object or undefined
   */
  getMatchById(id: string): Readonly<Match> | undefined;

  /**
   * Updates the score of the match with the given ID
   * @param id ID of the match to update
   * @param homeScore New home team score (optional)
   * @param awayScore New away team score (optional)
   */
  updateScore(id: string, homeScore?: number, awayScore?: number): void;

  finishMatch(id: string): void;

  /**
   * Retrieves a summary of all active matches
   * @returns An array of Match objects, read-only
   */
  getSummary(): ReadonlyArray<Match>;
}
