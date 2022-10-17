import { MatchType } from "@prisma/client";

export interface Query {
  entryTeamNumber?: number;
  compName?: string;
  matchType?: MatchType;
  mobility?: boolean;
}

export interface InputType {
  userInput: string | number;
  comparable: boolean;
  comparison?: string;
}