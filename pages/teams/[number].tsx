import { NextPage } from "next";
import { useRouter } from "next/router";
import { Protected } from "../../components/auth/protected";
import { useQuery } from "../../hooks/trpc";

const TeamContent: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "team.get-by-number",
    { number: Number(router.query.number) }
  ])


  return (
    <Protected>
      <div className="px-2 py-4">
        <h1 className="mb-2 text-4xl">{data?.name}</h1>
        <h1 className="text-xl">Team {data?.number}</h1>
      </div>
    </Protected>
  );
}

export default TeamContent;