import type { Entry } from "@prisma/client";
import { RungLevel } from "@prisma/client";
import { number } from "zod";

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

export function sum(data: Entry[] | undefined, key: keyof Entry): number {
  let ans = 0;
  data?.filter((e) => e[key]).forEach(e => ans += (e[key] as number))

  return ans;
}

function countRungs(data: Entry[], rungLevel: RungLevel): number {
  const rungs = data?.filter((e) => e.climbRung === rungLevel);
  return rungs === undefined ? 0 : rungs.length;
}

export function nanFormat(value: number): number {
  return isNaN(value) ? 0 : value;
}

export function percentageFormat(value: number): string {
  return (value*100).toFixed(2);
}

export function calculateStats(data: Entry[]): Statistics {
  let ballStats: BallStats = {
    autoHighShotsMade: sum(data, "autoHighShotsMade"),
    autoHighShotsTotal: sum(data, "autoHighShotsTotal"),
    autoLowShotsMade: sum(data, "autoLowShotsMade"),
    autoLowShotsTotal: sum(data, "autoLowShotsTotal"),

    autoHighPercentage: nanFormat(sum(data, "autoHighShotsMade") / sum(data, "autoHighShotsTotal")),
    autoLowPercentage: nanFormat(sum(data, "autoLowShotsMade") / sum(data, "autoLowShotsTotal")),

    teleopHighShotsMade: sum(data, "teleopHighShotsMade"),
    teleopHighShotsTotal: sum(data, "teleopHighShotsTotal"),
    teleopLowShotsMade: sum(data, "teleopLowShotsMade"),
    teleopLowShotsTotal: sum(data, "teleopLowShotsTotal"),

    teleopHighPercentage: nanFormat(sum(data, "teleopHighShotsMade") / sum(data, "teleopHighShotsTotal")),
    teleopLowPercentage: nanFormat(sum(data, "teleopLowShotsMade") / sum(data, "teleopLowShotsTotal")),

    averageHighShots: nanFormat((sum(data, "autoHighShotsMade") + sum(data, "teleopHighShotsMade")) / data?.length),
    averageLowShots: nanFormat((sum(data, "autoLowShotsMade") + sum(data, "teleopLowShotsMade")) / data?.length),
  };

  let climbStats: ClimbStats = {
    averageClimbTime: nanFormat((sum(data, "climbStart") - sum(data, "climbEnd")) / data?.length),
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
