import type { Entry } from "@prisma/client";
import { RungLevel } from "@prisma/client";

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

function countRungs(data: Entry[] | undefined, rungLevel: RungLevel): number {
  const rungs = data?.filter((e) => e.climbRung === rungLevel);
  return rungs === undefined ? 0 : rungs.length;
}

export function calculateStats(data: Entry[] | undefined): Statistics {
  console.log(data!)
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

  let climbStats: ClimbStats = {
    averageClimbTime: (sum(data, "climbEnd") - sum(data, "climbStart")) / data!.length,
    noClimb: countRungs(data, RungLevel.NONE),
    lowClimb: countRungs(data, RungLevel.LOW),
    midClimb: countRungs(data, RungLevel.MID),
    highClimb: countRungs(data, RungLevel.HIGH),
    travClimb: countRungs(data, RungLevel.TRAVERSAL)
  }

  return {
    ballStats,
    climbStats
  };

}
