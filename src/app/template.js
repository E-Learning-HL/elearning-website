"use client";
//dispatchRouteChangeEvent completed
import { useEffect, Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import * as NProgress from "nprogress";
// import { useRouter } from "next/router";

export default function Template({ children }) {
  const pathname = usePathname();

  // const router = useRouter();
  useEffect(() => {
    NProgress.done();
  }, [pathname]);
  return <div>{children}</div>;
}
