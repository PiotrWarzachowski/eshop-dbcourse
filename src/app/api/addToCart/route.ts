import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import { AddProductValidator } from "@/lib/validators/AddProductValidator";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
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
  const cartId = userObj!.cartId;
  const productId: string = body!.productId;

  const prevData = await db.product.findFirst({
    where: { id: productId },
  });

  const addCart = await db.product.update({
    where: { id: productId },
    data: {
      cartId: [...prevData!.cartId, cartId],
    },
  });

  return new NextResponse(JSON.stringify({ addCart }), { status: 200 });
};
