import { useSession, signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

const Nav = () => {
  const { data: session } = useSession();
  console.log(session?.user?.image);
  return (
    <>
      {session && (
        <div className="flex items-center justify-start p-4 bg-gray-800">
          <img src={session?.user?.image} className="w-12 mr-4 rounded-full" />
          <h2 className="text-lg">{session?.user.name}</h2>
          <button className="ml-auto" onClick={() => signOut()}>
            <BiLogOut className="text-4xl duration-200 hover:text-red-400" />
          </button>
        </div>
      )}
    </>
  );
};

export default Nav;
