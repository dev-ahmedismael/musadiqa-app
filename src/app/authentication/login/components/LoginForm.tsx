"use client";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { useAuthSubmit } from "@/hooks/useAuthSubmit";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("أدخل البريد الإلكتروني")
    .email("أدخل بريد إلكتروني صالح."),
  password: z
    .string()
    .nonempty("أدخل كلمة المرور")
    .min(8, "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const { submit } = useAuthSubmit();

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await submit("login", data);

    if (res) {
      redirect(`/${res.data.domain}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5"
    >
      <TextField
        variant="standard"
        label="البريد الإلكتروني"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
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
        helperText={errors.password ? errors.password.message : ""}
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

      <Button
        type="submit"
        variant="contained"
        size="large"
        endIcon={<LoginTwoToneIcon />}
        loading={isSubmitting}
        loadingPosition="start"
      >
        تسجيل الدخول
      </Button>
    </Box>
  );
}
