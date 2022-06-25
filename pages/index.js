import Link from "next/link";
import Protected from "../components/Protected";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, isLoading } = useSession();

  return (
    <Protected>
      {isLoading ? (
        <h1 className="text-white">Loading...</h1>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          {/* <button
            className="p-4 mb-4 text-white duration-200 border border-green-400 rounded-xl hover:border-green-400"
            onClick={() => signIn()}
          >
            Sign in
          </button> */}
          <Link href="/scout" passHref>
            <button className="p-4 mb-4 text-white duration-200 border border-pink-600 rounded-xl hover:bg-pink-600">
              Start scouting!
            </button>
          </Link>
          <button className="px-8 py-4 text-white duration-200 border rounded-xl border-cyan-400 hover:bg-cyan-400">
            View scouting data
          </button>
        </div>
      )}
    </Protected>
  );
}
