"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NavButton } from "./nav-button";
import { dark } from "@clerk/themes";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useNavigationBar } from "@hooks/navigation-bar.hook";
import { MenuButton } from "./menu-button";
import Link from "next/link";

export function NavigationBar() {
  const { navigationBarRef, showNavigationBar, setShowNavigationBar } =
    useNavigationBar();

  return (
    <header
      ref={navigationBarRef}
      className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b-1 border-gray-700 bg-neutral-950 px-10 py-4"
    >
      <MenuButton
        showNavigationBar={showNavigationBar}
        setShowNavigationBar={setShowNavigationBar}
      />
      <nav
        className={twMerge(
          "fixed top-0 z-40 flex h-screen flex-col items-center justify-center gap-4 border-r-1 border-gray-700 bg-neutral-950 p-10 transition-all sm:static sm:h-fit sm:w-full sm:flex-row sm:justify-between sm:border-r-0 sm:bg-transparent sm:transition-none",
          clsx(showNavigationBar ? "left-0" : "-left-100"),
        )}
      >
        <Link
          href="/"
          className="font-bold transition-all duration-100 hover:text-blue-600 sm:hover:text-white"
        >
          Clerk Blog
        </Link>
        <SignedOut>
          <div className="flex w-full flex-col items-center gap-4 sm:w-fit sm:flex-row">
            <NavButton href="/sign-in">Sign In</NavButton>
            <NavButton href="/sign-up">Sign Up</NavButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex w-full flex-col items-center gap-4 sm:w-fit sm:flex-row">
            <NavButton href="/dashboard">Sistema</NavButton>
            <UserButton
              appearance={{
                baseTheme: dark,
                variables: {
                  colorBackground: "#0a0a0a",
                },
              }}
            />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
}
