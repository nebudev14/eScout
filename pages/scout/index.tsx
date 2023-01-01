import type { NextPage } from "next";
import React, { useEffect } from "react";
import Protected from "../../components/auth/protected";
import { MatchInfo } from "../../components/ui/form/match-info";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "../../hooks/trpc";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { setPreScoutAtom, setSelectedCompAtom } from "../../server/atoms";
import EntryForm from "../../components/ui/form/entry-form";
import { MatchForm } from "@prisma/client";
import { EntryFormType } from "../../types/misc-types";

const Scout: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedForm, setSelectedForm] = useState<EntryFormType | undefined>(undefined);

  const { data: user } = useQuery([
    "user.get-forms-by-id",
    { userId: session?.user.id as string },
  ]);

  useEffect(() => {
    if (user?.teams.length !== 0) {
      setSelectedTeam(user?.teams[0].teamId as string);
      setSelectedForm(user?.teams[0].team.matchScouts[0])
    }
  }, [user?.teams, setSelectedTeam]);

  const { data: matchForms, isLoading } = useQuery([
    "match.get-by-team-id",
    { teamId: selectedTeam },
  ]);

  const submitEntry = useMutation("entry.create");``

  const [selectedComp] = useAtom(setSelectedCompAtom);

  const defendedRef = useRef<HTMLInputElement>(null);
  const defendedByRef = useRef<HTMLInputElement>(null);

  const [defended, setDefended] = useState<number[]>([]);
  const [defendedBy, setDefendedBy] = useState<number[]>([]);
  const [prescout, setPrescout] = useAtom(setPreScoutAtom);

  return (
    <Protected>
      <div className="min-h-screen py-16 md:px-4 xl:px-36 2xl:px-52 dark:text-white">
        <h1 className="2xl:text-red-600 xl:text-cyan-400">weee</h1>
        <div className="flex items-center justify-start xl:px-4 2xl:px-12">
          {matchForms?.length !== 0 || selectedTeam !== undefined ? (
            <select className="h-full p-2 mb-4 border-r-4 rounded-lg shadow-md outline-none dark:text-white dark:bg-zinc-900 dark:border-zinc-700">
              {matchForms?.map((matchForm, i) => (
                <option key={i}>{matchForm.name}</option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="xl:px-4 2xl:px-12">
          <MatchInfo />
          <div className="flex flex-col">
            {!isLoading ? <EntryForm form={user?.teams?.[0].team.matchScouts?.[0]} /> : null}
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default Scout;
