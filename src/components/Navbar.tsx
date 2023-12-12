import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = async () => {
  const user = await currentUser();

  const userId = user?.id;

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold m-4">
            <span>EShop.</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            {!userId && (
              <>
                <SignInButton>
                  <button
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button
                    className={buttonVariants({
                      size: "sm",
                    })}
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
            {userId && (
              <>
                <Link
                  href="/admin"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Admin
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
                <Link
                  href="/cart"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                  })}
                >
                  Cart <ShoppingBasket className="ml-2 h-5 w-5" />
                </Link>
                <div className="ml-auto">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
