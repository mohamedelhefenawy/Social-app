"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  UserPlus
} from "lucide-react";
import { Button } from "@/src/app/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/src/app/components/ui/sheet";
import { useEffect, useState } from "react";
import {  SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { usePathname } from "next/navigation";

export default function MobileNavbar({ user }: { user: { username?: string; email: string } | null }) {
  const [showmobilemenu, setShowMobileMenu] = useState(false);

  const pathname = usePathname()
  useEffect(()=>{
    setShowMobileMenu(false)
  },[pathname])

  return (
    <div className="flex md:hidden items-center space-x-2">
      <ModeToggle />
      <Sheet open={showmobilemenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MenuIcon className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>
            {user ? (
              <>
                <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                  <Link href="/follow">
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </Link>
                </Button>
               
                <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                  <Link
                    href={`/profile/${
                      user?.username ?? user?.email.split("@")[0]
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start w-full">
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <>
              <SignInButton mode="redirect">
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </SignInButton>

              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
