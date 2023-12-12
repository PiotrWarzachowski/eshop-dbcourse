import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ShieldHalf } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "@/db";
const page = async () => {
  const user = await currentUser();

  if (!user?.id || !user) {
    return (
      <MaxWidthWrapper>
        <div className="flex items-center justify-center mt-10 content-evenly">
          <div className="flex flex-col items-center justify-center">
            <ShieldHalf className="w-10 h-10 align-middle justify-center mt-4 mb-4" />
            <p className="text-lg">You are not logged in.</p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  const admin = await db.user.findFirst({
    where: {
      id: user.id,
      isAdmin: true,
    },
  });

  if (!admin) {
    return (
      <MaxWidthWrapper>
        <div className="flex items-center justify-center mt-10 content-evenly">
          <div className="flex flex-col items-center justify-center">
            <ShieldHalf className="w-10 h-10 align-middle justify-center mt-4 mb-4" />
            <p className="text-lg">You are not an admin.</p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <h1 className="text-6xl font-bold mb-10 mt-10">
        Admin Panel{" "}
        <span className="inline-block align-bottom ml-2">
          <ShieldHalf className="w-16 h-16" />
        </span>
      </h1>
      <div className="flex items-center">
        <div className="border-r border-gray-400 h-6 mr-2"></div>
        <Link href="/admin/create-product" className="text-zinc-800">
          {" "}
          Add a product
        </Link>
        <div className="border-r border-gray-400 h-6 ml-2"></div>
        <Link href="/admin/delete-products" className="text-zinc-800 ml-2">
          Delete a product
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
