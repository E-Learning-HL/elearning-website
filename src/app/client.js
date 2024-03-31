"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as NProgress from "nprogress";
function WrapperClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
export default function Wrapper() {
  return (
    <Suspense>
      <WrapperClient />
    </Suspense>
  );
}
