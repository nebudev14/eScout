import { signIn, useSession } from "next-auth/react";
import React from "react";

const Protected: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { status } = useSession();
  if (status === "unauthenticated") signIn("google");
  if (status === "authenticated") return <>{children}</>;

  return null;
};

export default Protected
