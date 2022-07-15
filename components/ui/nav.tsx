import { useSession, signOut } from "next-auth/react";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { Menu } from "@headlessui/react";

export const Nav: React.FC = () => {
  const { data: session } = useSession();

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

              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Duplicate
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Archive
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Move
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
                        <BiLogOut className="mr-2 text-2xl duration-200" /> Log out 
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
