import type { NextPage } from "next";
import { BsGoogle } from "react-icons/bs";
import { UnAuthed } from "../components/auth/unauthed";
import { signIn } from "next-auth/react";

const SignIn: NextPage = () => {
  return (
    <UnAuthed path="/home">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-6 text-3xl">eScout</h1>
        <button
          className="px-8 py-4 text-2xl text-white duration-200 bg-purple-500 border rounded-lg hover:bg-purple-400"
          onClick={() => signIn("google")}
        >
          <div className="flex flex-row items-center justify-center text-center">
            <h1 className="mr-4">Sign in with </h1>
            <BsGoogle className="text-3xl" />
          </div>
        </button>
      </div>
      )
    </UnAuthed>
  );
};

export default SignIn;
