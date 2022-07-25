import { t } from "../_app";

export const appRouter = t.router({
  cookies: t.procedure.query(async ({ ctx }) => {
    const token = await ctx.res.jwtSign({
      msg: "Testing a cookie in TRPC",
    });

    ctx.res.setCookie("token", token, {
      domain: "localhost",
      path: "/",
      // Switch
      secure: false,
      httpOnly: true,
      sameSite: true,
    });
    // .code(200)
    // .send("Cookie sent");

    return "Cookie sent";
  }),

  verifycookie: t.procedure.query(async ({ ctx }) => {
    try {
      await ctx.req.jwtVerify();
      ctx.res.send({ code: "OK", message: "it works!" });
    } catch (error) {
      ctx.res.send(error);
    }
  }),
});

export type AppRouter = typeof appRouter;
