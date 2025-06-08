"use client";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Skeleton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Organization } from "@/types/organization.types";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

interface Props {
  currentOrganization: Organization | undefined;
  organizations: Organization[] | undefined;
}

export default function NavbarOrganizations({
  currentOrganization,
  organizations,
}: Props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        bgcolor={"primary.main"}
        color={"white"}
        className="px-5 h-[53px] flex items-center gap-5 relative cursor-pointer"
        onClick={handleClick}
      >
        {currentOrganization ? (
          <Avatar
            variant="rounded"
            src={currentOrganization.logo}
            alt={currentOrganization.name.charAt(0)}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              width: "30px",
              height: "30px",
            }}
          >
            {!currentOrganization.logo && <AccountBalanceIcon />}
          </Avatar>
        ) : (
          <Skeleton variant="rounded" width={40} height={40} />
        )}
        {currentOrganization ? (
          currentOrganization.name
        ) : (
          <Skeleton variant="rounded" width={130} height={20} />
        )}

        <KeyboardArrowDownIcon />

        {open && (
          <Box
            bgcolor="primary.light"
            className="absolute z-50 top-full right-0 w-full p-2 rounded-b grid grid-cols-1 gap-3"
          >
            {organizations?.map((org, index) => (
              <Box
                key={index}
                className="flex items-center gap-5 p-2 rounded"
                sx={{
                  ":hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <Avatar
                  variant="rounded"
                  src={org.logo}
                  alt={org.name.charAt(0)}
                  sx={{ bgcolor: "white", color: "primary.main" }}
                >
                  {!org.logo && <AccountBalanceIcon />}
                </Avatar>
                <Typography fontSize={"small"}>{org.name}</Typography>
              </Box>
            ))}
            <Box
              className="flex items-center gap-5 p-2 rounded"
              sx={{
                ":hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              <Avatar
                variant="rounded"
                sx={{ bgcolor: "white", color: "primary.main" }}
              >
                <AddIcon />
              </Avatar>
              <Typography fontSize={"small"}>إضافة مؤسسة جديدة</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
