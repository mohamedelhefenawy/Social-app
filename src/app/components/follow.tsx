"use client";

import { useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface prop{
    children : React.ReactNode
}

export default function Followonmobile({children}:prop) {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Mobile breakpoint
  const router = useRouter();

  useEffect(() => {
    if (!isMobile) {
      router.push("/"); // Redirect to home if not on mobile
    }
  }, [isMobile, router]);

  if (!isMobile) return null; // Prevent rendering on desktop

  return <>{children}</>;

}
