import type { Entry } from "@prisma/client";

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

function sum(data: Entry[] | undefined, key: keyof Entry) {
  let ans = 0;
  data?.filter((e) => e[key]).forEach(e => ans += (e[key] as number))

  return ans;
}



export function calculateStats(data: Entry[] | undefined): any {
  let ballStats: BallStats = {
    
  };

  // let climbStats: ClimbStats = {

  // }

  // return {
  //   ballStats,
  //   climbStats
  // };
  return sum(data, "autoHighShotsMade" as keyof Entry)
}
