import Link from "next/link";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box } from "@mui/material";

export default function NavbarHelp() {
  return (
    <Link href={"/"}>
      <Box
        className="border-s  border-slate-300 h-[56px] flex justify-center items-center px-5"
        color={"text.secondary"}
      >
        <HelpOutlineIcon />
      </Box>
    </Link>
  );
}
