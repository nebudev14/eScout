import type { NextPage } from "next";
import Link from "next/link";
import { Protected } from "../components/auth/protected";
import { useMutation, useQuery } from "../hooks/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = useQuery([
    ""
  ])
  
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
        <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <button
            className="relative px-4 py-2 mb-4 text-3xl text-white duration-200 rounded-md hover:bg-teal-700 dark:bg-black"
            type="button"
          >
            Scout!
          </button>
        </div>
        </Link>
        <button
          className="px-8 py-4 text-xl text-white duration-200 bg-purple-500 rounded-lg hover:bg-purple-400"
        >
          View scouting data
        </button>
      </div>
      )
    </Protected>
  );
};

export default Home;
