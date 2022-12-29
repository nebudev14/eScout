import { Competition, Entry } from "@prisma/client";
import { InputType } from "../types/filter-types";
import { atom } from "jotai";

export const darkModeAtom = atom<boolean>(true);
export const setPreScoutAtom = atom<boolean>(false);
export const setSelectedCompAtom = atom<Competition | undefined>(undefined);
export const setSearchQueryAtom = atom<InputType | undefined>(undefined);
export const selectEntryAtom = atom<Entry | undefined>(undefined);
