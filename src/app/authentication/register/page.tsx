import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Metadata } from "next";
import RegisterForm from "./components/RegisterForm";

export const metadata: Metadata = {
  title: "مصدقة | إنشاء حساب جديد",
};

export default function Register() {
  return (
    <Box className="grid grid-cols-1 gap-5 w-full lg:min-w-[45vw]">
      <Box className="py-5">
        <Typography textAlign={"center"} variant="h5" color="primary">
          إنشاء حساب جديد
        </Typography>
      </Box>

      <RegisterForm />

      <Box className="flex flex-col justify-center items-center">
        <Typography color="text.secondary">هل لديك حساب؟</Typography>
        <Link href="/authentication/login">
          <Typography color="primary">تسجيل الدخول</Typography>
        </Link>
      </Box>
    </Box>
  );
}
