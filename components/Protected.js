import { signIn, useSession } from "next-auth/react";

export default function Protected({ children }) {
    const { status } = useSession();
    if (status === "unauthenticated") signIn("google");
    if (status === "authenticated") return <>{children}</>;
    
    return null;
}