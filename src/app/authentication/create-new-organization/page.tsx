import { Box, Typography } from "@mui/material";

import Link from "next/link";

import { Metadata } from "next";
import OrganizationForm from "./components/OrganizationForm";

export const metadata: Metadata = {
  title: "مصدقة | إضافة مؤسسة جديدة",
};

export default function Register() {
  return (
    <Box className="grid grid-cols-1 gap-5 w-full lg:min-w-[45vw]">
      <Box className="py-5">
        <Typography textAlign={"center"} variant="h5" color="primary">
          إضافة مؤسسة جديدة
        </Typography>
      </Box>

      <OrganizationForm />

      <Box className="flex flex-col justify-center items-center">
        <Typography color="text.secondary">هل لديك حساب؟</Typography>
        <Link href="/authentication/login">
          <Typography color="primary">تسجيل الدخول</Typography>
        </Link>
      </Box>
    </Box>
  );
}
