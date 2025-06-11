
# Salvador Munoz Portfolio

Personal portfolio app - showcasing front-end dev skills by using React and React Three Fiber to load GLTF models as JSX Components and manipulate with user interactivity.




## Run Locally

Clone the project

```bash
  git clone git@github.com:SalvadorM/tournament.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## 🎮 Tournament Routes

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | `/tournament/all`         | Get the all the tournaments  |
| POST   | `/tournament/create`         | Create a new tournament   |

> Tournament includes associations to Team, Match, and Standing.
---

## 🎮 Team Routes

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | `/team/tournament/:tournamentId`         | Get the all the teams based on tournament id   |
| GET    | `/team/all`     | Get the all the teams   |
| POST   | `/team/create`         | create a new team using tournamentId  |
| PUT    | `/team/:teamId`     | Update a Team (e.g. status)     |
<!-- | DELETE | `/player/:id`     | Delete a match                   | -->

> Team includes associations to Match, Standing, and MatchResult.


---

## 🎮 Player Routes

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | `/player/team/:teamId`  | Get the all the players from teamId   |
| POST   | `/player/create` | create a new team using tournamentId  |
| PUT    | `/player/update/:playerId`     | Update a player based on playerId and body name, teamId  |
| DELETE | `/player/:playerId`     | Delete a player by playerId   |
<!-- | GET    | `/player/:id`     | Get a specific match by ID       | -->

> Player includes associations to Team.


---

## 🎮 Match Routes

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | `/match/tournament/:tournamentId`         | Get all the match based on tournamentId  |
| GET    | `/match/:matchId`     | Get single match details based on matchId |
| POST   | `/match/create`         | Create a new match using tournament and team ids  |
| PUT    | `/match/update/:matchId`     | Update single match details based on matchId  |
<!-- | DELETE | `/match/:id`     | Delete a match                   | -->

> Match includes associations to Tournament, Team, and MatchResult.


---

## 🎮 Match Result Routes

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | `/matchresults/tournament/:tournamentId`         | Get match results for tournament |
| GET    | `/matchresults/:matchResultsId`     | Get match results info based on matchResultsId |
| POST   | `/matchresults/create`         | Create a new match results based on matchid  |
| PUT    | `/matchresults/update/:matchResultsId`     | Update match results base on matchResultsId and body data |
| PUT    | `/matchresults/completed`     | Update match result, using Internal Services    |
<!-- | DELETE | `/matchresults/:id`     | Delete a match                   | -->

> Match includes associations to Tournament and Team.
---

## 📊 Standings Routes

| Method | Endpoint                         | Description                                  |
|--------|----------------------------------|----------------------------------------------|
| GET    | `/standings/:tournamentId`      | Get standings for a tournament (sorted by points ascending) |
| GET    | `/standings/formatted/:tournamentId`      | Get standings for a tournament (sorted by points desc and goal difference desc) |

> Standings are not manually updated — they are triggered internally when a completed match result is saved.
> Standings includes associations to Tournament and Team.

---

## 🛠 Internal Services

- `StandingsService.updateStandingOnMatchComplete(matchId)`
  - Called when a match result is completed
  - Calculates win/loss/draw and updates the `Standing` table using Sequelize transactions

  
## Tech Stack

- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [sqlite3](https://www.npmjs.com/package/sqlite3)


