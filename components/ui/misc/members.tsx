import { useQuery } from "../../../hooks/trpc";
import Image from "next/image";
import {
  BsFillPersonFill,
  BsClipboard,
  BsClipboardCheck,
} from "react-icons/bs";
import { RiVipCrownFill } from "react-icons/ri";
import { MemberStatus } from "@prisma/client";
import { useState } from "react";

export const Members: React.FC<{ teamNum: number }> = ({ teamNum }) => {
  const [copy, setCopy] = useState(false);
  const { data: members } = useQuery([
    "team.get-by-number",
    { number: teamNum },
  ]);

  return (
    <div className="min-h-screen">
      <h1 className="my-4 text-2xl">
        <b>Members</b>
      </h1>
      <div className="flex items-center justify-start">
        <h1 className="px-6 py-2 text-2xl font-semibold rounded-l-lg dark:bg-zinc-900">
          {members?.inviteId}
        </h1>
        <button
          className="px-3 py-2 text-xl text-white bg-pink-600 rounded-r-lg shadow-md"
          onClick={() => {
            navigator.clipboard.writeText(members?.inviteId as string);
            setCopy(true);
          }}
        >
          {copy ? <BsClipboardCheck size={30} /> : <BsClipboard size={30} />}
        </button>
      </div>
      <div className="py-4 px-96 md:px-4">
        {members?.members.map((member, i) => (
          <div
            key={i}
            className="flex items-center justify-start px-8 py-4 border-b-2 dark:border-zinc-700"
          >
            <Image
              src={member.user.image as string}
              alt={member.user.name as string}
              height={45}
              width={45}
              className="rounded-full"
            />
            <h1 className="ml-4 mr-auto text-2xl">{member.user.name}</h1>
            {member.status === MemberStatus.CREATOR ? (
              <RiVipCrownFill size={30} />
            ) : (
              <BsFillPersonFill size={30} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
