import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, isLoading } = useSession();

  console.log(session)

  return (
    <>
      {isLoading ? (
        <h1 className="text-white">Loading...</h1>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <button
            className="p-4 mb-4 text-white duration-200 border border-green-400 rounded-xl hover:border-green-400"
            onClick={() => signIn()}
          >
            Sign in
          </button>
          {session && (
            <div>
              <h1 className="text-white">{session.user.email}</h1>
            </div>
          )}
          <button className="p-4 mb-4 text-white duration-200 border border-pink-600 rounded-xl hover:bg-pink-600">
            Start scouting!
          </button>
          <button className="px-8 py-4 text-white duration-200 border rounded-xl border-cyan-400 hover:bg-cyan-400">
            View scouting data
          </button>
        </div>
      )}
    </>
  );
}
