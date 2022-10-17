import { MatchType } from "@prisma/client";

export interface Query {
  entryTeamNumber?: number;
  compName?: string;
  matchType?: MatchType;
  mobility?: boolean;
}

export interface InputType {
  userInput: any; // im a disappointment
  comparable: boolean;
  comparison?: string;
}