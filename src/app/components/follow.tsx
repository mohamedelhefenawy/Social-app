"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from 'react-responsive';

interface props{
    children : React.ReactNode
}

export default function Followonmobile({children}:props) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile breakpoint
  const router = useRouter();

  useEffect(() => {
    if (!isMobile) {
      router.push("/"); // Redirect to home if not on mobile
    }
  }, [isMobile, router]);

  if (!isMobile) return null; // Prevent rendering on desktop

  return <>{children}</>;

}
