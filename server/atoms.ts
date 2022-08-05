import { Competition } from "@prisma/client";
import { atom } from "jotai";

export const createTeamModalAtom = atom<boolean>(false);
export const createCompModalAtom = atom<boolean>(false);
export const setSelectedCompAtom = atom<Competition | undefined>(undefined);