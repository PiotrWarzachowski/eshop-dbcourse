"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AddProductValidator } from "@/lib/validators/AddProductValidator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Textarea } from "@/components/ui/textarea";
import { Pen, PenLine, PencilLine } from "lucide-react";

export default function ProductForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddProductValidator>>({
    resolver: zodResolver(AddProductValidator),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddProductValidator>) {
    console.log(values);
    const res = await fetch("/api/addProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    console.log(res);
    if (res.ok) {
      // Redirect to the product page.
      const { id } = await res.json();
      console.log(id);
    } else {
      console.log(res);
    }
  }

  return (
    <MaxWidthWrapper className="mt-8">
      <h1 className="text-6xl font-bold mb-10 mt-10">
        Create a product{" "}
        <span className="inline-block align-bottom ml-2">
          <PenLine className="w-16 h-16" />
        </span>
      </h1>{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="example name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public product name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={1}
                    placeholder="example description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public product description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product price</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public product name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
