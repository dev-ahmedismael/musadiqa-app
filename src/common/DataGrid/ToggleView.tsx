"use client";

import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";

interface Props {
  onViewChange: (value: string) => void;
  view: string;
}

export default function ToggleView({ onViewChange, view }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (selectedView: string) => {
    onViewChange(selectedView);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{ color: "text.secondary" }}
        startIcon={<PreviewIcon />}
      >
        طريقة العرض
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          selected={view === "table"}
          onClick={() => handleSelect("table")}
        >
          عرض الجدول
        </MenuItem>
        <MenuItem
          selected={view === "spreadsheet"}
          onClick={() => handleSelect("spreadsheet")}
        >
          عرض Spreadsheet
        </MenuItem>
      </Menu>
    </>
  );
}
