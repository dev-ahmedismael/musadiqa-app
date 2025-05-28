"use client";
import { useIndex } from "@/services/api";
import { Organization } from "@/types/organization.types";
import { User } from "@/types/user.types";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import NavbarOrganizations from "./NavbarOrganizations";
import NavbarUser from "./NavbarUser";
import NavbarHelp from "./NavbarHelp";
import NavbarModules from "./NavbarModules";

export default function Navbar() {
  const params = useParams();
  const { data } = useIndex("user-organizations");
  const [user, setUser] = useState<User | undefined>(undefined);
  const [organizations, setOrganizations] = useState<
    Organization[] | undefined
  >(undefined);
  const [currentOrganization, setCurrentOrganization] = useState<
    Organization | undefined
  >(undefined);

  React.useEffect(() => {
    if (!data) return;

    setUser(data.user);
    setOrganizations(data.user.tenants);

    const domain = params.org;

    const currentOrganization: Organization = data.user.tenants.find(
      (org: Organization) =>
        org.domains &&
        Array.isArray(org.domains) &&
        org.domains.length > 0 &&
        org.domains[0].domain === domain
    );

    setCurrentOrganization(currentOrganization);
  }, [data, params.org]);

  return (
    <Box
      component={"nav"}
      className="flex justify-between items-center shadow relative z-50"
    >
      {/* Organizations */}
      <NavbarOrganizations
        currentOrganization={currentOrganization}
        organizations={organizations}
      />

      {/* User & Help and Support & Modules */}
      <Box className="flex">
        <NavbarModules />
        <NavbarHelp />
        <NavbarUser user={user} />
      </Box>
    </Box>
  );
}
