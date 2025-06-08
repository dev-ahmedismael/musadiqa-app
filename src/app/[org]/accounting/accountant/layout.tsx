import Tabbar from "@/common/Tabbar/Tabbar";
import { Box } from "@mui/material";

const tabs = [
  { label: "القيود اليدوية", href: "accounting/accountant/journals" },
  { label: "شجرة الحسابات", href: "accounting/accountant/accounts" },
  { label: "الضرائب", href: "accounting/accountant/taxes" },
];

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Tabbar tabs={tabs} />
      {children}
    </Box>
  );
}
