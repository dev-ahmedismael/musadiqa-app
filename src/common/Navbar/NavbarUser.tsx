"use client";
import { User } from "@/types/user.types";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Skeleton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PortraitIcon from "@mui/icons-material/Portrait";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useSubmit } from "@/hooks/useSubmit";

interface Props {
  user: User | undefined;
}
export default function NavbarUser({ user }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const router = useRouter();

  const { submit } = useSubmit();

  const logout = async () => {
    const res = await submit("logout", {});

    if (res) {
      router.push("/authentication/login");
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        className="px-5 flex items-center gap-3 border-s border-slate-300 relative cursor-pointer"
        color={"text.secondary"}
        onClick={handleClick}
      >
        {user ? (
          <Typography>
            {user.first_name} {user.last_name}
          </Typography>
        ) : (
          <Skeleton height={20} width={100} variant="rounded" />
        )}

        <Box className="flex justify-center items-center gap-1">
          <Avatar
            src={user?.profile_picture}
            alt={user?.first_name.charAt(0)}
            sx={{ width: "30px", height: "30px" }}
          />
          <KeyboardArrowDownIcon />
        </Box>

        {/* Menu */}
        {open && (
          <Box className="absolute z-50 bg-white top-full right-0 w-full p-2 border border-slate-300 rounded grid grid-cols-1 gap-2">
            <Box
              className="flex items-center gap-5 p-2 rounded"
              sx={{
                "&:hover": { bgcolor: "secondary.main" },
                ":active": { bgcolor: "secondary.dark" },
              }}
            >
              <PortraitIcon />
              <Typography fontSize={"small"}>تعديل الملف الشخصي</Typography>
            </Box>

            <Box
              className="flex items-center gap-5 p-2 rounded"
              sx={{
                "&:hover": { bgcolor: "secondary.main" },
                ":active": { bgcolor: "secondary.dark" },
              }}
              onClick={logout}
            >
              <PowerSettingsNewIcon sx={{ color: red[700] }} />
              <Typography fontSize={"small"}>تسجيل الخروج</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
