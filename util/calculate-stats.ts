import { Entry } from "@prisma/client";

interface BallStats {
  // Auto
  autoHighShotsMade: number;
  autoHighShotsTotal: number;
  autoLowShotsMade: number;
  autoLowShotsTotal: number;

  autoHighPercentage: number;
  autoLowPercentage: number;

  // Teleop
  teleopHighShotsMade: number;
  teleopHighShotsTotal: number;
  teleopLowShotsMade: number;
  teleopLowShotsTotal: number;

  teleopHighPercentage: number;
  teleopLowPercentage: number;

  // Average shots per game
  averageHighShots: number;
  averageLowShots: number;
}

interface ClimbStats {
  averageClimbTime: number;
  // Rung counts
  noClimb: number;
  lowClimb: number;
  midClimb: number;
  highClimb: number;
  travClimb: number;
}

export interface Statistics {
  ballStats: BallStats;
  climbStats: ClimbStats;

}

export function calculateStats(data: Entry[] | undefined): any {
  // let ballStats: BallStats = {

  // };

  // let climbStats: ClimbStats = {

  // }

  // return {
  //   ballStats,
  //   climbStats
  // };
  return data?.filter((e) => e.autoHighShotsMade).reduce((a, { autoHighShotsMade }) => a + autoHighShotsMade, 0)
}
