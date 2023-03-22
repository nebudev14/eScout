import { useRouter } from "next/router";
import Protected from "@components/auth/protected";
import { Filter } from "@components/scouting/filter/filter";
import { ManageCompetitions } from "@components/ui/misc/competitions";
import { Tab } from "@headlessui/react";
import { ManageScoutForm } from "@components/ui/misc/scout-forms";
import { Members } from "@components/ui/misc/members";
import { useSession, getSession } from "next-auth/react";
import { MatchFormResponse, MemberStatus } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { appRouter } from "@server/routers/_app";
import { createContextInner } from "@server/context";
import { MdSettings } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TeamContent(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { teamId } = props;

  const memberIndex = props.team?.members
    .map((e) => e.userId)
    .indexOf(props.session?.user.id as string);
  const isMember = memberIndex !== -1;

  const [selectedForm, setSelectedForm] = useState<string>("");
  const [selectedMatch, setSelectedMatch] = useState<MatchFormResponse>();
  useEffect(() => {
    if (props.team?.matchScouts.length !== 0) {
      setSelectedForm(props.team?.matchScouts?.[0].id as string);
    }
  }, [setSelectedForm]);

  return (
    <Protected>
      l
      {isMember ? (
        <div className="min-h-screen px-16 py-8 md:px-8 dark:text-white md:h-full 2xl:h-full">
          <div className="flex justify-start">
            <h1 className="mb-2 mr-auto text-4xl">{props.team?.name}</h1>
            <Link href={`/teams/${teamId}/settings`} passHref>
              <MdSettings
                size={30}
                className="duration-150 hover:cursor-pointer hover:text-pink-600"
              />
            </Link>
          </div>
          <h1 className="mb-4 text-xl">Team {props.team?.number}</h1>
          <div className="mb-1">
            {props.team?.matchScouts.filter((e) => e.id === selectedForm)
              ?.length !== 0 ||
            props.team?.matchScouts.filter((e) => e.id === selectedForm)
              ?.length !== undefined ? (
              <select
                className="h-full p-2 mb-4 border-r-4 rounded-lg shadow-md outline-none dark:text-white dark:bg-zinc-900 dark:border-zinc-700"
                onChange={(e: React.SyntheticEvent) =>
                  setSelectedForm((e.target as HTMLSelectElement).value)
                }
              >
                {props.team?.matchScouts
                  .filter((e) => e.id === selectedForm)
                  ?.map((form, i) => (
                    <option value={form.id} key={i}>
                      {form.name}
                    </option>
                  ))}
              </select>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-24 py-2">
            <div className="mx-2">
              {props.team?.matchScouts
                .filter((e) => e.id === selectedForm)?.[0]
                ?.responses.map((response, i) => (
                  <div
                    className="px-3 py-2 my-2 mr-2 duration-200 border hover:shadow-lg hover:cursor-pointer rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-600 dark:text-white"
                    onClick={() => setSelectedMatch(response)}
                  >
                    <h1 className="mb-2 text-xl">
                      <span className="font-semibold">Team</span>{" "}
                      {response.teamNum}
                    </h1>
                    <div className="flex items-center">
                      <Image
                        className="rounded-full"
                        height={30}
                        width={30}
                        src={response.user?.user?.image as string}
                      />
                    </div>
                  </div>
                ))}
            </div>
            {/* <div>
              {props.team?.matchScouts?.[0].responses.map((response, i) => (
                <div>
                  {response.comments}
                </div>
              ))}
            </div> */}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen text-3xl dark:text-white">
          You aren&apos;t a part of that team!
        </div>
      )}
    </Protected>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session: session,
    }),
  });

  const teamId = context.params?.id as string;
  const team = await ssg.team.getById.fetch({ entityId: teamId });

  team?.members.forEach((m) => {
    m.user.created = String(m.user.created);
    m.user.emailVerified = String(m.user.emailVerified);
    m.user;
  });

  return {
    props: {
      team: team,
      session: session,
      teamId,
    },
  };
}
