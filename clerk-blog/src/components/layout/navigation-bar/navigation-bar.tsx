"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { cn } from "@utils/cn";
import Link from "next/link";
import { useNavigationBar } from "@hooks/navigation-bar.hook";
import { MenuButton } from "./menu-button";
import { NavButton } from "./nav-button";

export function NavigationBar() {
  const { navigationBarRef, showNavigationBar, setShowNavigationBar } =
    useNavigationBar();

  return (
    <header
      ref={navigationBarRef}
      className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b-1 border-gray-700 bg-black/30 px-10 py-4 backdrop-blur-md"
    >
      <MenuButton
        showNavigationBar={showNavigationBar}
        setShowNavigationBar={setShowNavigationBar}
      />
      <nav
        className={cn(
          "fixed top-0 z-40 flex h-screen flex-col items-center justify-center gap-4 border-r-1 border-gray-700 bg-black p-14 transition-all sm:static sm:h-fit sm:w-full sm:flex-row sm:justify-between sm:border-r-0 sm:bg-transparent sm:transition-none",
          showNavigationBar ? "left-0" : "-left-100",
        )}
      >
        <Link
          href="/"
          className="font-bold transition-all duration-100 hover:text-blue-600 sm:hover:text-white"
        >
          Clerk Blog
        </Link>
        <SignedOut>
          <div className="flex w-full flex-col items-center gap-4 sm:w-fit sm:flex-row sm:gap-8">
            <NavButton href="/sign-in">Entrar</NavButton>
            <NavButton href="/sign-up">Criar uma conta</NavButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex w-full flex-col items-center gap-8 sm:w-fit sm:flex-row">
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
