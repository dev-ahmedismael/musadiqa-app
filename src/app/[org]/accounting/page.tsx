import { redirect } from "next/navigation";

export default async function Accounting({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = await params;
  redirect(`/${org}/accounting/sales`);
}
