import type { InferGetServerSidePropsType, NextPage } from "next";
import React, { useEffect } from "react";
import Protected from "@components/auth/protected";
import { useState, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import EntryForm from "@components/ui/form/entry-form";
import { Answer } from "types/form-types";
import { trpc } from "@util/trpc/trpc";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext } from "next";
import { appRouter } from "@server/routers/_app";
import { createContextInner } from "@server/context";
import {
  Team,
  MatchType,
  MatchForm,
  TeamUser,
  Competition,
  Location,
  PieceType,
} from "@prisma/client";
import { Combobox, Switch } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { Input } from "@components/ui/input";
import { Container } from "@components/ui/container";

type FetchedTeam = Team & {
  members: TeamUser[];
  matchScouts: MatchForm[];
  comps: Competition[];
};

export default function Scout(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  /** Data */
  const [selectedTeam, setSelectedTeam] = useState<FetchedTeam | undefined>();
  const [selectedComp, setSelectedComp] = useState<Competition | undefined>();
  const [prescout, setPrescout] = useState<boolean>(false);
  const [videoLink, setVideoLink] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [form, setForm] = useState<string>();

  /** Rendered */
  const [compQuery, setCompQuery] = useState("");
  const filteredComps =
    compQuery === ""
      ? selectedTeam?.comps
      : selectedTeam?.comps?.filter((compData: Competition) => {
          return compData.name.toLowerCase().includes(compQuery.toLowerCase());
        });

  // TODO: THIS IS NOT SAFE LMAOOO
  const updateElements = (team: FetchedTeam) => {
    setSelectedTeam(team);
    if (team.comps.length !== 0) setSelectedComp(team.comps[0]);
    if (team.matchScouts.length !== 0) setForm(team.matchScouts[0].id);
  };

  useEffect(() => {
    if (props.teams.length !== 0) {
      const initTeam = props.teams[0];
      updateElements(initTeam.team as FetchedTeam);
    }
  }, [setSelectedTeam, setSelectedComp, setForm]);

  let matchForms = selectedTeam?.matchScouts;

  const submitResponse = trpc.match.addResponse.useMutation();

  // make submit method and pass into entry form component
  const submitForm = async (answers: Answer[]) => {
    console.log(answers);
    await submitResponse.mutateAsync({
      entityId: selectedTeam?.id as string,
      compId: selectedComp?.id as string,
      formId: form as string,
      prescout: prescout,
      video: videoLink,
      comments: comments,
      answer: answers,
    });

    await router.push("/teams");
  };

  return (
    <Protected>
      <div className="min-h-screen py-16 md:px-4 xl:px-36 2xl:px-52 dark:text-white">
        {/* <h1 className="2xl:text-red-600 xl:text-cyan-400">weee</h1> */}
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
          {/* Match Info */}
          <div className="grid grid-cols-1 mb-8">
            <Container>
              <label className="p-3 py-2 text-lg leading-tight border rounded shadow dark:bg-zinc-900 dark:border-zinc-700 bg-slate-200 text-cetner focus:outline-none focus:shadow-outline">
                Submit data to
              </label>
              <select
                id="teamId"
                className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                value={selectedTeam?.id}
                onChange={(event: React.SyntheticEvent) => {
                  const team = props?.teams.filter(
                    (e) =>
                      e.team.id === (event.target as HTMLSelectElement).value
                  )[0]?.team;
                  updateElements(team);
                }}
              >
                {props?.teams.map((team, i) => (
                  <option key={i} value={team.team.id}>
                    {team.team.number}
                  </option>
                ))}
              </select>
            </Container>
            <Container>
              <select
                id="matchType"
                className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:border-zinc-700 dark:text-white dark:bg-zinc-900"
              >
                <option value={MatchType.QUALIFICATION}>Qualification</option>
                <option value={MatchType.QUARTERFINAL}>Quarterfinal</option>
                <option value={MatchType.SEMIFINAL}>Semifinal</option>
                <option value={MatchType.FINAL}>Final</option>
              </select>
              <Input
                id="matchNumber"
                placeholder="Match number"
                type="number"
                autoComplete="off"
                required
              />
            </Container>
            <Input
              id="entryTeamNumber"
              placeholder="Team number"
              type="number"
              autoComplete="off"
              required
            />
            {prescout ? (
              <Input
                id="videoLink"
                placeholder="Video Link"
                type="text"
                autoComplete="off"
                onChange={(link) =>
                  setVideoLink((link.target as HTMLInputElement).value)
                }
                required
              />
            ) : null}
            <Combobox value={selectedComp} onChange={setSelectedComp}>
              <div className="relative z-50 border rounded-b dark:border-zinc-700">
                <div className="relative w-full overflow-hidden text-left bg-white rounded shadow-md cursor-default dark:border-zinc-700 dark:text-white dark:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="p-2 text-lg leading-tight rounded focus:outline-none focus:shadow-outline dark:border-zinc-700 dark:text-white dark:bg-zinc-900"
                    displayValue={(comp: Competition) => comp?.name}
                    onChange={(event) => setCompQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiSelector
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:border-zinc-700 dark:text-white dark:bg-zinc-900 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredComps?.map((comp: Competition) => (
                    <Combobox.Option
                      key={comp.name}
                      value={comp}
                      className="relative px-3 py-2 cursor-default select-none"
                    >
                      {comp.name}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>
          <div className="flex items-center mb-6">
            <h1 className="mr-4 text-2xl font-semibold">Prescout</h1>
            <Switch
              checked={prescout}
              onChange={setPrescout}
              className={`${
                prescout ? "bg-pink-600" : "bg-zinc-600"
              } relative  inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  prescout ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full duration-300 ease-in-out bg-white transition`}
              />
            </Switch>
          </div>
          <div className="flex flex-col">
            {/* For some reason, list of teams is rendered as undefined initially. This is a disgusting workaround  */}
            {props?.teams.filter(
              (t) => t.team.id === (selectedTeam?.id as string)
            )[0] !== undefined ? (
              <EntryForm
                form={
                  props?.teams
                    .filter(
                      (t) => t.team.id === (selectedTeam?.id as string)
                    )[0]
                    .team.matchScouts?.filter((f) => f?.id === form)?.[0]
                }
                submitResponse={submitForm}
                setComment={setComments}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Protected>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session: await getSession(context),
    }),
  });

  let teams = await ssg.team.getByUser.fetch();

  // Dates aren't valid types to be passed into props :rofl:
  teams.forEach((e) =>
    e.team.members.forEach((m) => {
      m.user.created = String(m.user.created);
      m.user.emailVerified = String(m.user.emailVerified);
    })
  );

  return {
    props: {
      teams: teams,
    },
  };
}
