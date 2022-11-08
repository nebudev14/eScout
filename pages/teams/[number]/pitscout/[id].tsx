import { useRouter } from "next/router";
import { useQuery } from "../../../../hooks/trpc";

const EditPitScout: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "pit.get-by-id",
    { id: router.query.id as string }
  ]);

  return (
    <div className="h-screen px-48 py-12 dark:text-white">
      <h1 className="text-3xl">
        <b>{data?.name}</b>
      </h1>
    </div>
  );
}

export default EditPitScout;
