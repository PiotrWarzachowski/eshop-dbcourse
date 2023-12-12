import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/db";
import Dashboard from "@/components/Dashboard";

const Page = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;
  const products = await db.product.findMany({});
  console.log(user);
  if (!user?.id || !email) {
    redirect("/auth-callback?origin=dashboard");
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return <Dashboard products={products} />;
};

export default Page;
