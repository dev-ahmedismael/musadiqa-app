"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function OrgLink({ href, children }: LinkProps) {
  const params = useParams();
  const organization = params.org;

  const orgHref = href.startsWith("/")
    ? `/${organization}${href}`
    : `/${organization}/${href}`;

  return <Link href={orgHref}>{children}</Link>;
}
