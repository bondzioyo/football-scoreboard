# Football ScoreBoard

Simple library for managing live football matches.

## Installation

Get library from npm:

```bash
  npm install @bondzioyo/football-scoreboard
```

#### or

```bash
  pnpm add @bondzioyo/football-scoreboard
```

## Features

- Start a game
- Update scores
- Finish a game
- Get summary of active games sorted by:
  - Total score (descending)
  - Start time (newer first)

## Documentation

| Method                | Description                                                     |
| :-------------------- | :-------------------------------------------------------------- |
| `setMatch`            | A method for creating a match.                                  |
| `getMatchById`        | A method that retrieves a single match by its `id`.             |
| `getMatchByTeamNames` | A method that retrieves a single match by its playing teams.    |
| `updateScore`         | A method for updating the result.                               |
| `finishMatch`         | A method that ends ongoing match.                               |
| `getSummary`          | A method that returns the results of currently ongoing matches. |

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

```ts
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

## Run Locally

Clone the project

```bash
  git clone https://github.com/bondzioyo/football-scoreboard.git
```

Go to the project directory

```bash
  cd football-scoreboard
```

Install dependencies

```bash
  pnpm install
```

## Running Tests

To run tests, run the following command

```bash
  pnpm test
```

## Assumptions

- A lightweight, in-memory library that uses a `Map` to store match data, providing efficient lookup and management operations.

- Developed following the **Test-Driven Development** (TDD) methodology to ensure correctness and clean design from the start.

- Matches are represented as plain object literals, reducing unnecessary complexity compared to using classes.

- Written in **TypeScript** to ensure strong typing for methods and data structures, improving reliability and maintainability.

- Unit tests are implemented with **Vitest** to verify functionality and ensure robustness.

- The uuid library is used to generate unique match identifiers.

- The library prevents creating new matches involving teams that are already playing an ongoing match.

- Supports updating the score for one or both teams, with validation ensuring that new values cannot be lower than previous ones (no need to check for negatives since a match starts at 0:0).

- Published as a **scoped npm package** for convenient installation and to avoid naming conflicts with other packages.

- Provides methods to retrieve matches by `id` or, if the `id` is unknown, by team names.

## License (MIT)

[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2025 Wojciech Świątek, https://github.com/bondzioyo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
