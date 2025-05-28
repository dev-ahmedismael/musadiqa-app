import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Metadata } from "next";
import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
  title: "مصدقة | تسجيل الدخول",
};

export default function Login() {
  return (
    <Box className="grid grid-cols-1 gap-5 w-[80vw] md:w-[40vw] lg:w-[30vw]">
      <Box className="py-5">
        <Typography textAlign={"center"} variant="h5" color="primary">
          تسجيل الدخول
        </Typography>
      </Box>

      <LoginForm />

      <Box className="flex flex-col justify-center items-center">
        <Typography color="text.secondary">ليس لديك حساب؟</Typography>
        <Link href="/authentication/register">
          <Typography color="primary">إنشاء حساب جديد</Typography>
        </Link>
      </Box>
    </Box>
  );
}
