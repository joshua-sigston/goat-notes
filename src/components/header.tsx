import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import DarkModeToggle from "./dark-mode-toggle";
import LogoutBtn from "./logout-btn";
import { getUser } from "@/auth/server";

const Header = async () => {
  const user = await getUser();
  return (
    <header
      className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >
      <Link href="/" className="flex items-end gap-2">
        <Image
          src="/goatius.png"
          height={60}
          width={60}
          alt="logo"
          priority
          className="rounded-full"
        />
        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
          GOAT <span>Notes</span>
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <LogoutBtn />
        ) : (
          <>
            <Button asChild>
              <Link href="/signup" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
