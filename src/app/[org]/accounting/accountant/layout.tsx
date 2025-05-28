import { Box } from "@mui/material";

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box className="px-5">{children}</Box>;
}
