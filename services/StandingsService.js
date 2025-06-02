'use strict'

const db = require('../config/database');
const sequelize = db.sequelize
const Standing = db.Standing
const Match = db.Match
const MatchResult = db.MatchResult

class StandingsService {

    async updateStandingOnMatchComplete( matchId ){

        //To ensure both updates succeed together or fail together, wrap them in a transaction:
        const standingTransaction = sequelize.transaction();

        try {
            const match = Match.findByPk( 
                matchId, {
                    include: [ MatchResult ],
                    transaction
                }
            )
            //If match is not complete or no results throw error
            if (!match || match.status !== 'completed' || !match.matchresult) {
                throw new Error('Match is not completed or result is missing.');
            }

            //deconstruct neede variables 
            const {
                home_team_id,
                away_team_id,
                tournamentId,
                matchresult: { home_score, away_score, winner_team_id },
            } = match

            const updateStanding = async ( teamId , isHome ) => {
                const goalsFor = isHome ? home_score : away_score;
                const goalsAgainst = isHome ? away_score : home_score;
                const isWin = teamId === winner_team_id;
                const isDraw = winner_team_id === null;
                const isLoss = !isWin && !isDraw;

                const [standing] = await Standing.findOrCreate({
                    where: { team_id: teamId, tournamentId },
                    defaults: {
                        points: 0,
                        wins: 0,
                        losses: 0,
                        draws: 0,
                        goals_for: 0,
                        goals_against: 0,
                        matches_played: 0,
                    },
                    transaction,
                });

                standing.matches_played += 1;
                standing.goals_for += goalsFor;
                standing.goals_against += goalsAgainst;

                if (isWin) {
                    standing.wins += 1;
                    standing.points += 3;
                } else if (isDraw) {
                    standing.draws += 1;
                    standing.points += 1;
                } else if (isLoss) {
                    standing.losses += 1;
                }

                await standing.save({ transaction });
                
            }

            // Update both home and away standings in parallel
            await Promise.all([
                updateStanding(home_team_id, true),
                updateStanding(away_team_id, false),
            ]);

            await transaction.commit();
            console.log('Standings updated successfully with transaction');
            return true
        } catch( error ){
            await transaction.rollback();
            console.error('Transaction failed - rolled back standings update:', error.message);
            return false
        }
    }

}

module.exports = new StandingsService;