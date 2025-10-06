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
   * Retrieves a summary of all active matches
   * @returns An array of Match objects, read-only
   */
  getSummary(): ReadonlyArray<Match>;
}
