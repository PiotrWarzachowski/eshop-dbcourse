import { TRPCError } from "@trpc/server";
import {
  adminProcedure,
  privateProcedure,
  publicProcedure,
  router,
} from "./trpc";
import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import { z } from "zod";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    console.log(user, email);
    if (!user || !email) throw new TRPCError({ code: "UNAUTHORIZED" });

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
        email: email,
      },
    });

    console.log("user : ", dbUser);
    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: email,
        },
      });
    }
    return { success: true };
  }),

  getProducts: privateProcedure.query(async () => {
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    console.log(user, email);
    if (!user || !email) throw new TRPCError({ code: "UNAUTHORIZED" });

    return db.product.findMany({});
  }),
});
export type AppRouter = typeof appRouter;
