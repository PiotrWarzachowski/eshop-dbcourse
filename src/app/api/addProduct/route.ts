import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import { AddProductValidator } from "@/lib/validators/AddProductValidator";

export const POST = async (req: NextRequest) => {
  // endpoint for asking a question for a PDF

  const body = await req.json();
  const user = await currentUser();
  const userId = user?.id;

  if (!user || !userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const admin = await db.user.findFirst({
    where: {
      id: userId,
      isAdmin: true,
    },
  });

  if (!admin) {
    return new Response("Unauthorized", { status: 401 });
  }

  let { name, description, price } = AddProductValidator.parse(body);

  const product = await db.product.create({
    //@ts-ignore
    data: {
      name,
      description,
      price: parseFloat(price),
      userId,
    },
  });

  return new NextResponse(JSON.stringify(product), { status: 200 });
};
