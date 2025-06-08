import NavTabs from "@/common/Navtabs/Navtabs";
import { Box } from "@mui/material";

const tabs = [
  { label: "المبيعات", href: "accounting/sales" },
  { label: "المشتريات", href: "accounting/purchases" },
  { label: "للمحاسب", href: "accounting/accountant" },
  { label: "الفروع", href: "accounting/branches" },
  { label: "الأصول الثابتة", href: "accounting/fixed-assets" },
  { label: "المشاريع", href: "accounting/projects" },
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
      <NavTabs tabs={tabs} />
      <Box className="px-5">{children}</Box>
    </Box>
  );
}
