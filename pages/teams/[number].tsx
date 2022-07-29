import { NextPage } from "next";
import { useRouter } from "next/router";
import { Protected } from "../../components/auth/protected";
import { Filter } from "../../components/scouting/filter";
import { useQuery } from "../../hooks/trpc";

const TeamContent: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "team.get-by-number",
    { number: Number(router.query.number) }
  ])

  
  return (
    <Protected>
      <div className="h-screen px-6 py-4">
        <h1 className="mb-2 text-4xl">{data?.name}</h1>
        <h1 className="mb-6 text-xl">Team {data?.number}</h1>
        <div className="flex flex-col items-center justify-center">
          <Filter teamNum={Number(router.query.number)} />
        </div>
      </div>
    </Protected>
  );
}

export default TeamContent;