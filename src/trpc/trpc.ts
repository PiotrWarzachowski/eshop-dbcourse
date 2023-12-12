import { use } from "react";
import { currentUser } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";
import { db } from "@/db";
const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const user = await currentUser();
  console.log(user);
  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user: user,
    },
  });
});

const isAdmin = middleware(async (opts) => {
  const user = await currentUser();
  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const admin = await db.user.findFirst({
    where: {
      id: user.id,
      isAdmin: true,
    },
  });

  console.log(admin);
  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user: user,
    },
  });
});

export const router = t.router;
export const privateProcedure = t.procedure.use(isAuth);
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAdmin);
