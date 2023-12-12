import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { currentUser } from "@clerk/nextjs";
import { GhostIcon, ShoppingCart } from "lucide-react";
import { db } from "@/db";
import Link from "next/link";
import Cart from "@/components/Cart";
const Page = async () => {
  const user = await currentUser();
  if (!user || !user?.id) {
    return (
      <MaxWidthWrapper>
        <div className="flex items-center justify-center mt-10 content-evenly">
          <div className="flex flex-col items-center justify-center">
            <GhostIcon className="w-10 h-10 align-middle justify-center mt-4 mb-4" />
            <p className="text-lg">You are not logged in.</p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }
  const data = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!data) {
    return (
      <MaxWidthWrapper>
        <div className="flex items-center justify-center mt-10 content-evenly">
          <div className="flex flex-col items-center justify-center">
            <GhostIcon className="w-10 h-10 align-middle justify-center mt-4 mb-4" />
            <p className="text-lg">You are not logged in.</p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  const userCartId = data.cartId;

  const userCart = await db.product.findMany({
    where: {},
  });

  const cart = userCart.map((elem) => {
    if (elem.cartId.includes(userCartId)) {
      return elem;
    }
  });

  if (cart.length === 0) {
    return (
      <MaxWidthWrapper>
        <div className="flex items-center justify-center mt-40 content-evenly">
          <div className="flex flex-col items-center justify-center">
            <ShoppingCart className="w-10 h-10 align-middle justify-center" />
            <p className="text-lg">Your cart is empty.</p>
            <p className="text-sm text-zinc-500">
              Go{" "}
              <Link href="/dashboard" className="text-blue-500 font-semibold">
                Here
              </Link>{" "}
              and some products to your cart.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }
  if (!userCart) {
    return (
      <MaxWidthWrapper>
        <div className="flex items-center justify-center mt-40 content-evenly">
          <div className="flex flex-col items-center justify-center">
            <ShoppingCart className="w-10 h-10 align-middle justify-center" />
            <p className="text-lg">Your cart is empty.</p>
            <p className="text-sm text-zinc-500">
              Go{" "}
              <Link href="/dashboard" className="text-blue-500 font-semibold">
                Here
              </Link>{" "}
              and some products to your cart.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  return <Cart cartProducts={cart}></Cart>;
};

export default Page;
