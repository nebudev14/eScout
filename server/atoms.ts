import { Competition, Entry } from "@prisma/client";
import { InputType } from "../types/filter-types";
import { atom } from "jotai";

export const createTeamModalAtom = atom<boolean>(false);
export const createCompModalAtom = atom<boolean>(false);
export const createPitModalAtom = atom<boolean>(false);
export const createQuestionModalAtom = atom<boolean>(false);
export const setSelectedCompAtom = atom<Competition | undefined>(undefined);
export const setSearchQueryAtom = atom<InputType | undefined>(undefined);
export const selectEntryAtom = atom<Entry | undefined>(undefined);
