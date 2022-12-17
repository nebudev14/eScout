import { useRouter } from "next/router";
import { useQuery } from "../../../../../hooks/trpc";

export const EditMatchScout: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "match.get-by-id",
    { id: router.query.match_id as string },
  ]);

  

  return (
    <div>

    </div>
  );
}