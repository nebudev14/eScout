import type { NextPage } from "next";
import React, { useEffect } from "react";
import Protected from "../../components/auth/protected";
import { Container } from "../../components/ui/container";
import { MatchInfo } from "../../components/ui/form/match-info";
import { ScoreBoard } from "../../components/ui/form/score-board";
import { Input } from "../../components/ui/input";
import { MatchType, RungLevel } from "@prisma/client";
import { getNumberById } from "../../util/get-number-by-id";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "../../hooks/trpc";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { setPreScoutAtom, setSelectedCompAtom } from "../../server/atoms";
import { Switch } from "@headlessui/react";
import { Team } from "@prisma/client";

const Scout: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();
  const { data: user } = useQuery([
    "user.get-by-id",
    { userId: session?.user.id as string },
  ]);

  useEffect(() => {
    if(user?.teams.length !== 0) setSelectedTeam(user?.teams[0].team);
  }, [setSelectedTeam]);

  console.log(selectedTeam)

  const { data: matchForms } = useQuery([
    "match.get-by-team-id",
    { teamId: selectedTeam?.id as string },
  ]);

  const submitEntry = useMutation("entry.create");

  const [selectedComp] = useAtom(setSelectedCompAtom);

  const defendedRef = useRef<HTMLInputElement>(null);
  const defendedByRef = useRef<HTMLInputElement>(null);

  const [defended, setDefended] = useState<number[]>([]);
  const [defendedBy, setDefendedBy] = useState<number[]>([]);
  const [prescout, setPrescout] = useAtom(setPreScoutAtom);

  return (
    <Protected>
      <div className="min-h-screen py-16 px-36 dark:text-white">
        <div className="flex items-center justify-start ">
          {matchForms?.length !== 0 || selectedTeam !== undefined ? (
            <select className="h-full p-2 border-r-4 rounded-lg shadow-md outline-none dark:text-white dark:bg-zinc-900 dark:border-zinc-700"></select>
          ) : null}
        </div>
      </div>
    </Protected>
  );
};

export default Scout;
