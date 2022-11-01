import { useSession, signOut } from "next-auth/react";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { IoMdBuild } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { MdAnalytics } from "react-icons/md";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";

export const Nav: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      {session && (
        <div className="flex items-center justify-start px-4 py-2 border-b-2 border-gray-200 dark:border-gray-800 dark:text-white">
          {/* <img src={session?.user?.image} className="w-12 mr-4 rounded-full" /> */}
          <h2 className="mr-auto text-lg">{session?.user?.name}</h2>
          <div className="w-56 text-right ">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white duration-200 bg-black rounded-md hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <BiMenu/ >
                </Menu.Button>
              </div>

              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-slate-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className="flex items-center w-full px-2 py-2 text-sm text-black duration-200 rounded-md group hover:text-white hover:bg-black"
                        onClick={() => router.push("/teams")}
                      >
                        <IoMdBuild className="mr-2" /> Manage teams
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className="flex items-center w-full px-2 py-2 text-sm text-yellow-500 duration-200 rounded-md group hover:text-white hover:bg-yellow-400"
                        onClick={() => router.push("/scout")}
                      >
                        <CgNotes className="mr-2" /> Match Scout
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className="flex items-center w-full px-2 py-2 text-sm text-pink-600 duration-200 rounded-md group hover:text-white hover:bg-yellow-400"
                        onClick={() => router.push("/scout")}
                      >
                        <CgNotes className="mr-2" /> Pit Scout
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                      onClick={() => signOut()}
                        className="flex items-center w-full px-2 py-2 text-sm text-red-500 duration-200 rounded-md group hover:text-white hover:bg-red-400"
                      >
                        <BiLogOut className="mr-2 duration-200" /> Log out 
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
};
