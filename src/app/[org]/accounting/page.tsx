import { redirect } from "next/navigation";

interface Props {
  params: { org: string };
}

export default async function Accounting({ params }: Props) {
  const { org } = await Promise.resolve(params);
  redirect(`/${org}/accounting/accountant`);
}
