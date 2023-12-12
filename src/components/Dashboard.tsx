"use client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRightIcon, Check, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DashboardClientProps {
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
}

const addToCardHandler = async (id: string) => {
  const res = await fetch("/api/addToCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  console.log(id);
  console.log(res);
  return res;
};
const Dashboard = ({ products }: DashboardClientProps) => {
  const { toast } = useToast();

  return (
    <MaxWidthWrapper>
      <h1 className="text-6xl font-bold mb-10 mt-10">
        Browse Products{" "}
        <span className="inline-block align-bottom ml-2">
          <ShoppingBag className="w-16 h-16" />
        </span>
      </h1>

      {products &&
        products.map((elem) => (
          <Card key={elem.id} className="mb-4 mt-4">
            <CardHeader>
              <CardTitle>{elem.name} </CardTitle>

              <CardDescription>{elem.description}</CardDescription>
              <CardDescription className="text-4xl text-black font-semibold">
                <span> {elem.price}$</span>
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button
                className="w-full mr-4 ml-4"
                variant="outline"
                onClick={() => {
                  addToCardHandler(elem.id);
                  toast({
                    title: "Added to cart",
                    description: "Product added to cart",
                  });
                }}
              >
                Add to cart <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button className="w-full mr-4 ml-4">
                <Check className="mr-2 h-4 w-4" /> Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
    </MaxWidthWrapper>
  );
};

export default Dashboard;
