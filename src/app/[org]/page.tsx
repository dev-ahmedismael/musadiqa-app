"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Organization() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const org = params?.org as string;
    if (org) {
      router.replace(`/${org}/dashboard`);
    }
  }, [params, router]);

  return null;
}
