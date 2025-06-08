"use client";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import CodeIcon from "@mui/icons-material/Code";
import OrgLink from "../Link/OrgLink";

export default function NavbarModules() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const modules = [
    {
      id: 1,
      title: "البريد الإلكتروني",
      icon: <MailOutlineIcon />,
      route: "mail",
    },
    {
      id: 2,
      title: "لوحة البيانات",
      icon: <EqualizerIcon />,
      route: "dashboard",
    },
    {
      id: 3,
      title: "إدارة الأعمال",
      icon: <CorporateFareIcon />,
      route: "business-management",
    },
    {
      id: 4,
      title: "المعاملات التجارية",
      icon: <CurrencyExchangeIcon />,
      route: "business-transactions",
    },
    {
      id: 5,
      title: "المحاسبة",
      icon: <AssuredWorkloadIcon />,
      route: "accounting",
    },
    { id: 6, title: "المطورين", icon: <CodeIcon />, route: "developers" },
  ];

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        color={"text.secondary"}
        className="h-[53px] flex justify-center items-center border-s border-gray-300 px-5 cursor-pointer relative"
        onClick={handleClick}
      >
        <AppsIcon />
        {open && (
          <Box className="absolute z-50 top-full left-0 bg-white p-2 rounded grid grid-cols-3 gap-5 border border-gray-300 w-max">
            {modules.map((m) => (
              <OrgLink key={m.id} href={m.route}>
                <Box
                  className="px-2 py-4 flex flex-col justify-center items-center gap-2 border border-transparent hover:border-gray-300 rounded"
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  {m.icon}
                  <Typography fontSize={"small"}>{m.title}</Typography>
                </Box>
              </OrgLink>
            ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
