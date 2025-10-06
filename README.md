# Football ScoreBoard

Simple library for managing live football matches.

## Features

- Start a game
- Update scores
- Finish a game
- Get summary of active games sorted by:
  - Total score (descending)
  - Start time (newer first)

## Methods

#### Get all items

| Method                | Description                                                    |
| :-------------------- | :------------------------------------------------------------- |
| `setMatch`            | A method for creating a match.                                 |
| `getMatchById`        | A method that retrieves a single match by its `id`.            |
| `getMatchByTeamNames` | A method that retrieves a single match by its playing teams.   |
| `updateScore`         | A method for updating the result.                              |
| `finishMatch`         | A method that ends ongoing match.                              |
| `getSummary`          | A method that returns the results of currently ongoing matches |

#### `setMatch`

```ts
  setMatch(home: string, away: string): id
```

| Parameter | Description    |
| :-------- | :------------- |
| `home`    | Home team name |
| `away`    | Away team name |

#### `getMatchById`

```ts
  getMatchById(id: string): Readonly<Match> | undefined
```

| Parameter | Description                 |
| :-------- | :-------------------------- |
| `id`      | ID of the match to retrieve |

#### `getMatchByTeamNames`

```http
  getMatchByTeamNames(home: string, away: string): Readonly<Match> | undefined;
```

| Parameter | Description    |
| :-------- | :------------- |
| `home`    | Home team name |
| `away`    | Away team name |

#### `updateScore`

```ts
   updateScore(id: string, homeScore?: number, awayScore?: number): void;
```

| Parameter   | Description                    |
| :---------- | :----------------------------- |
| `id`        | ID of the match to update      |
| `homeScore` | New home team score (optional) |
| `awayScore` | New away team score (optional) |

#### `finishMatch`

```ts
  finishMatch(id: string): void;
```

| Parameter | Description            |
| :-------- | :--------------------- |
| `id`      | ID of the match to end |

#### `getSummary`

```ts
   getSummary(): ReadonlyArray<Match>;
```

## Usage

```ts
import { Scoreboard } from "scoreboard";

const sb = new Scoreboard();

const id = sb.setMatch("Mexico", "Canada");

const match = sb.getMatchById(id);

sb.updateScore(id, 1, 0);

console.log(match); // {
//   id: 'eca8ea70-...',
//   home: 'Mexico',
//   away: 'Canada',
//   scoreHome: 1,
//   scoreAway: 0,
//   createdAt: 1759777086199,
//   updatedAt: 1759777086199
// }

sb.finishMatch(id);
```
