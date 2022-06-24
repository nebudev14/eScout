import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <button className="rounded-xl p-4 border border-pink-600 text-white mb-4 hover:bg-pink-600 duration-200">
        Start scouting!
      </button>
      <button className="rounded-xl py-4 px-8 border border-cyan-400 text-white hover:bg-cyan-400 duration-200">
        View scouting data
      </button>
    </div>
  );
}
