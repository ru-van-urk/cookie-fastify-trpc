import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import prisma from "../utils/prisma";

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
