import { useSession, signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

export const Nav: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <div className="flex items-center justify-start px-4 py-2 border-b-2 border-gray-200">
          {/* <img src={session?.user?.image} className="w-12 mr-4 rounded-full" /> */}
          <h2 className="text-lg">{session?.user?.name}</h2>
          <button className="ml-auto" onClick={() => signOut()}>
            <BiLogOut className="text-4xl duration-200 hover:text-red-400" />
          </button>
        </div>
      )}
    </>
  );
};
