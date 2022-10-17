import { Competition } from "@prisma/client";
import { InputType } from "../types/filter-types";
import { atom } from "jotai";

export const createTeamModalAtom = atom<boolean>(false);
export const createCompModalAtom = atom<boolean>(false);
export const setSelectedCompAtom = atom<Competition | undefined>(undefined);
export const setSearchQueryAtom = atom<InputType | undefined>(undefined);