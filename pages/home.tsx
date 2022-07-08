import type { NextPage } from "next";
import Link from "next/link";
import { Protected } from "../components/auth/protected";
import { useMutation, useQuery } from "../hooks/trpc";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const user = useMutation("user.create");
  const { data } = useSession();
  
  return (
    <Protected>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* <button
            className="p-4 mb-4 text-white duration-200 border border-green-400 rounded-xl hover:border-green-400"
            onClick={() => signIn()}
          >
            Sign in
          </button> */}
        <Link href="/scout" passHref>
          <button
            className="px-4 py-2 mb-4 text-3xl text-white duration-200 bg-teal-500 border rounded-md hover:bg-teal-700"
            type="button"
          >
            Scout!
          </button>
        </Link>
        <button
          className="px-8 py-4 text-xl text-white duration-200 bg-purple-500 border rounded-lg hover:bg-purple-400"
          onClick={async () => {
            await user.mutateAsync({
              id: "b",
              name: "warren",
              email: "dasf",
              image: "asdf",
            });
          }}
        >
          View scouting data
        </button>
      </div>
      )
    </Protected>
  );
};

export default Home;
