import type { NextPage } from "next";
import { BsGoogle } from "react-icons/bs";
import { UnAuthed } from "../components/auth/unauthed";
import { signIn } from "next-auth/react";

const SignIn: NextPage = () => {
  return (
    <UnAuthed path="/home">
      <div className="flex flex-col items-center justify-center min-h-screen dark:text-white">
        <h1 className="mb-4 text-5xl">eScout</h1>
        <h1 className="mb-6 text-2xl">A scouting app for FRC</h1>
        <button
          className="px-8 py-4 mb-6 text-2xl text-white duration-200 bg-pink-600 border rounded-lg dark:border-zinc-900 hover:bg-pink-700"
          onClick={() => signIn("google")}
        >
          <div className="flex flex-row items-center justify-center text-center mb-2flex">
            <h1 className="mr-4">Sign in with </h1>
            <BsGoogle className="text-3xl" />
          </div>
        </button>
        <h1 className="text-lg">Made with ❤️ from team 1155</h1>
      </div>
      )
    </UnAuthed>
  );
};

export default SignIn;
