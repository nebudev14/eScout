import { NextPage } from "next";
import { useSession } from "next-auth/react";

const PitScout: NextPage = () => {
  const { data: session } = useSession();
  

  return (
    <div>

    </div>
  );
}
