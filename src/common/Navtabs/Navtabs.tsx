"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams, useRouter, usePathname } from "next/navigation";

interface TabItem {
  label: string;
  href: string; // relative, e.g. "drafts"
}

interface NavTabsProps {
  tabs: TabItem[];
}

export default function NavTabs({ tabs }: NavTabsProps) {
  const { org } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const prefixedTabs = tabs.map((tab) => ({
    ...tab,
    fullHref: `/${org}/${tab.href}`,
  }));

  const activeIndex = prefixedTabs.findIndex((tab) =>
    pathname?.includes(tab.fullHref)
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    router.push(prefixedTabs[newValue].fullHref);
  };

  return (
    <Tabs
      value={activeIndex === -1 ? false : activeIndex}
      onChange={handleChange}
      aria-label="organization nav tabs"
      role="navigation"
      className="bg-slate-50 border-b border-slate-300 mb-5"
    >
      {prefixedTabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          sx={{ borderRight: "1px solid #cbd5e1", bgcolor: "white" }}
        />
      ))}
    </Tabs>
  );
}
