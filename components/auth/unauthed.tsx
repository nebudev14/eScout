import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const UnAuthed: React.FC<React.PropsWithChildren<{ path: string }>> = ({
children,
path,
}) => {
const { push } = useRouter();

const [loading, setLoading] = useState(true);
const { status } = useSession();

useEffect(() => {
  if (status === "authenticated") {
    push(path);
  } else if (status !== "loading") {
    setLoading(false);
  }
}, [status, push, path]);

if (loading) {
  return <h1>Loading...</h1>
}

return <>{children}</>;
};