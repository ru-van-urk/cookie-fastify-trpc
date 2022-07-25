import type { AppRouter } from "backend";
import { setupTRPC } from "@trpc/next";
import superjson from "superjson";

import { url } from "../constants";

export const trpc = setupTRPC<AppRouter>({
  config({ ctx }) {
    return {
      url,
      transformer: superjson,
    };
  },

  ssr: true,
});
