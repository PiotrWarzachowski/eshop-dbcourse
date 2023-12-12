"use client";
import { Check, ArrowRightIcon, ShoppingCartIcon } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface CartPageProps {
  cartProducts: any[];
}

const Cart = ({ cartProducts }: CartPageProps) => {
  return (
    <MaxWidthWrapper>
      <h1 className="text-6xl font-bold mb-10 mt-10">
        My Cart{" "}
        <span className="inline-block align-bottom ml-2">
          <ShoppingCartIcon className="w-16 h-16" />
        </span>
      </h1>

      {cartProducts.map((elem) => (
        <Card key={elem.id} className="mb-4 mt-4">
          <CardHeader>
            <CardTitle>{elem.name} </CardTitle>

            <CardDescription>{elem.description}</CardDescription>
            <CardDescription className="text-4xl text-black font-semibold">
              <span> {elem.price}$</span>
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full mr-4 ml-4" variant="destructive">
              Delete <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button className="w-full mr-4 ml-">
              <Check className="mr-2 h-4 w-4" /> Buy Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </MaxWidthWrapper>
  );
};

export default Cart;
