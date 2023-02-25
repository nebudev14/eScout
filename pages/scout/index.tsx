import type { NextPage } from "next";
import React, { useEffect } from "react";
import Protected from "@components/auth/protected";
import { MatchInfo } from "@components/ui/form/match-info";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { setPreScoutAtom, setSelectedCompAtom } from "@server/atoms";
import EntryForm from "@components/ui/form/entry-form";
import { Answer } from "types/form-types";
import { trpc } from "@util/trpc/trpc";

const Scout: NextPage = () => {
  const router = useRouter();

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [form, setForm] = useState<string>();

  const { data: user } = trpc.user.getForms.useQuery();

  useEffect(() => {
    if (user?.teams.length !== 0) {
      const initTeam = user?.teams[0];
      setSelectedTeam(initTeam?.teamId as string);
      if (initTeam?.team.matchScouts.length !== 0) {
        setForm(initTeam?.team.matchScouts[0].id);
      }
    }
  }, [user?.teams, setSelectedTeam]);

  const { data: matchForms, isLoading } = trpc.match.getByTeam.useQuery({
    teamId: selectedTeam,
  });

  const submitResponse = trpc.match.addResponse.useMutation();

  // console.log(user?.teams.filter((t) => t.team.id === selectedTeam)?.[0]);
  // console.log(form)

  const [selectedComp] = useAtom(setSelectedCompAtom);

  const defendedRef = useRef<HTMLInputElement>(null);
  const defendedByRef = useRef<HTMLInputElement>(null);

  const [defended, setDefended] = useState<number[]>([]);
  const [defendedBy, setDefendedBy] = useState<number[]>([]);
  const [prescout, setPrescout] = useAtom(setPreScoutAtom);

  // make submit method and pass into entry form component
  const submitForm = async (answers: Answer[]) => {
    await submitResponse.mutateAsync({
      teamId: selectedTeam,
      compId: selectedComp?.id as string,
      formId: form as string,
      prescout: prescout,
      video: "yea",
      answers: answers,
    });
  };

  return (
    <Protected>
      <div className="min-h-screen py-16 md:px-4 xl:px-36 2xl:px-52 dark:text-white">
        <h1 className="2xl:text-red-600 xl:text-cyan-400">weee</h1>
        <div className="flex items-center justify-start xl:px-4 2xl:px-12">
          {matchForms?.length !== 0 || selectedTeam !== undefined ? (
            <select
              className="h-full p-2 mb-4 border-r-4 rounded-lg shadow-md outline-none dark:text-white dark:bg-zinc-900 dark:border-zinc-700"
              onChange={(e: React.SyntheticEvent) =>
                setForm((e.target as HTMLSelectElement).value)
              }
            >
              {matchForms?.map((matchForm, i) => (
                <option value={matchForm.id} key={i}>
                  {matchForm.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="xl:px-4 2xl:px-12">
          <MatchInfo />
          <div className="flex flex-col">
            {!isLoading ? (
              <EntryForm
                form={
                  user?.teams
                    .filter((t) => t.team.id === selectedTeam)?.[0]
                    .team.matchScouts?.filter((f) => f?.id === form)?.[0]
                }
                submitResponse={submitForm}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default Scout;
