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

function sum(data: Entry[] | undefined, key: keyof Entry): number {
  let ans = 0;
  data?.filter((e) => e[key]).forEach(e => ans += (e[key] as number))

  return ans;
}

export function calculateStats(data: Entry[] | undefined): any {

  let ballStats: BallStats = {
    autoHighShotsMade: sum(data, "autoHighShotsMade"),
    autoHighShotsTotal: sum(data, "autoHighShotsTotal"),
    autoLowShotsMade: sum(data, "autoLowShotsMade"),
    autoLowShotsTotal: sum(data, "autoLowShotsTotal"),

    autoHighPercentage: sum(data, "autoHighShotsMade") / sum(data, "autoHighShotsTotal"),
    autoLowPercentage: sum(data, "autoLowShotsMade") / sum(data, "autoLowShotsTotal"),

    teleopHighShotsMade: sum(data, "teleopHighShotsMade"),
    teleopHighShotsTotal: sum(data, "teleopHighShotsTotal"),
    teleopLowShotsMade: sum(data, "teleopLowShotsMade"),
    teleopLowShotsTotal: sum(data, "teleopLowShotsTotal"),

    teleopHighPercentage: sum(data, "teleopHighShotsMade") / sum(data, "teleopHighShotsTotal"),
    teleopLowPercentage: sum(data, "teleopLowShotsMade") / sum(data, "teleopLowShotsTotal"),

    averageHighShots: (sum(data, "autoHighShotsMade") + sum(data, "teleopHighShotsMade")) / data!.length,
    averageLowShots: (sum(data, "autoLowShotsMade") + sum(data, "teleopLowShotsMade")) / data!.length,
  };

  // let climbStats: ClimbStats = {

  // }

  // return {
  //   ballStats,
  //   climbStats
  // };
  
}
