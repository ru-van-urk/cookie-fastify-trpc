import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { createContext } from "./trpc/context";
import { appRouter } from "./trpc/route/app.router";

const PORT = 8080;
const CORS_ORIGIN = ["http://localhost:3000", "http://localhost:8080"];

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

const fastify = Fastify();

fastify.register(cors, {
  origin: CORS_ORIGIN,
  // credentials: true,
});

fastify.register(jwt, {
  secret: "key",
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

fastify.register(cookie);

fastify.get(
  "/cookies",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const token = await reply.jwtSign({
      msg: "Testing a cookie",
    });

    reply
      .setCookie("token", token, {
        domain: "localhost",
        path: "/",
        // Switch
        secure: false,
        httpOnly: true,
        sameSite: true,
      })
      .code(200)
      .send("Cookie sent");
  }
);

fastify.get(
  "/verifycookie",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      reply.send({ code: "OK", message: "it works!" });
    } catch (error) {
      reply.send(error);
    }
  }
);

fastify.register(fastifyTRPCPlugin, {
  prefix: "/api/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
  },
});

async function main() {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
