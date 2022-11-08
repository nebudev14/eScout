import { useQuery } from "../../../hooks/trpc";
import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { RiVipCrownFill } from "react-icons/ri";
import { MemberStatus } from "@prisma/client";

export const Members: React.FC<{ teamNum: number }> = ({ teamNum }) => {
  const { data: members } = useQuery([
    "team.get-by-number",
    { number: teamNum },
  ]);

  return (
    <div className="min-h-screen">
      <h1 className="my-4 text-2xl">
        <b>Members</b>
      </h1>
      <div className="py-4 px-96 md:px-4">
        {members?.members.map((member, i) => (
          <div key={i} className="flex items-center justify-start px-8 py-4 border-b-2 dark:border-zinc-700">
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
