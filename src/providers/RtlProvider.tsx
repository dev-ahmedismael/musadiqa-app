"use client";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import React from "react";

export default function RtlCacheProvider(props: { children: React.ReactNode }) {
  const rtlCache = React.useMemo(() => {
    const cache = createCache({
      key: "muirtl",
      stylisPlugins: [prefixer, rtlPlugin],
    });
    return cache;
  }, []);
  return <CacheProvider value={rtlCache}>{props.children}</CacheProvider>;
}
