import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import { AddProductValidator } from "@/lib/validators/AddProductValidator";

export const GET = async (req: NextRequest) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!user || !userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userObj = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  const products = await db.product.findMany({});

  return new NextResponse(JSON.stringify({ products }), { status: 200 });
};
