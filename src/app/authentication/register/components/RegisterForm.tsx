"use client";

import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAuthSubmit } from "@/hooks/useAuthSubmit";
import { redirect } from "next/navigation";

const registerSchema = z
  .object({
    first_name: z.string().nonempty("أدخل الاسم الأول"),
    last_name: z.string().nonempty("أدخل الاسم الأخير"),
    phone: z.string().nonempty("أدخل رقم الهاتف"),
    email: z
      .string()
      .nonempty("أدخل البريد الإلكتروني")
      .email("أدخل بريد إلكتروني صالح."),
    password: z
      .string()
      .nonempty("أدخل كلمة المرور")
      .min(8, "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل."),
    password_confirm: z.string().nonempty("أكد كلمة المرور"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "كلمة المرور غير متطابقة",
    path: ["password_confirm"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const { submit } = useAuthSubmit();

  const onSubmit = async (data: RegisterFormInputs) => {
    const result = await submit("register", data);

    if (result) {
      redirect("/authentication/create-new-organization");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <TextField
        variant="standard"
        label="الاسم الأول"
        fullWidth
        {...register("first_name")}
        error={!!errors.first_name}
        helperText={errors.first_name?.message || ""}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        variant="standard"
        label="الاسم الأخير"
        fullWidth
        {...register("last_name")}
        error={!!errors.last_name}
        helperText={errors.last_name?.message || ""}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        variant="standard"
        label="رقم الهاتف"
        fullWidth
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message || ""}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        variant="standard"
        label="البريد الإلكتروني"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message || ""}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        variant="standard"
        label="كلمة المرور"
        type="password"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message || ""}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        variant="standard"
        label="تأكيد كلمة المرور"
        type="password"
        fullWidth
        {...register("password_confirm")}
        error={!!errors.password_confirm}
        helperText={errors.password_confirm?.message || ""}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box></Box>

      <Box className="md:col-span-2 flex justify-center">
        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<LoginTwoToneIcon />}
          loading={isSubmitting}
          loadingPosition="start"
        >
          إنشاء حساب جديد
        </Button>
      </Box>
    </Box>
  );
}
