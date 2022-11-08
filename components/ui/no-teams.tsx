import Link from "next/link";

const NoTeams: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:text-white">
      <h1 className="mb-4 text-3xl">You aren&apos;t in any teams yet!</h1>
      <h1 className="text-xl">Why not join one?</h1>
    </div>
  );
}

export default NoTeams;
