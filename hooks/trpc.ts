import type { AppRouter } from "../server/routers/app";
import { createReactQueryHooks } from "@trpc/react"; 

export const { useQuery, useMutation, ...trpc } = createReactQueryHooks<AppRouter>();
