import NavTabs from "@/common/Navtabs/Navtabs";
import { Box } from "@mui/material";

const tabs = [
  { label: "للمحاسب", href: "accounting/accountant" },
  { label: "الأصول الثابتة", href: "accounting/fixed-assets" },
  { label: "مراكز التكلفة", href: "accounting/cost-centers" },
  { label: "الحسابات البنكية", href: "accounting/bank-accounts" },
];
export default function AccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <NavTabs tabs={tabs} /> {children}
    </Box>
  );
}
