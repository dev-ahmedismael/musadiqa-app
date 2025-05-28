"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  InputAdornment,
} from "@mui/material";
import { currencies } from "@/data/currencies.data";
import { countries } from "@/data/countries";
import { employeesRange } from "@/data/employees-range.data";
import { industries } from "@/data/industries.data";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import { useSubmit } from "@/hooks/useSubmit";
import { redirect } from "next/navigation";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import ConstructionIcon from "@mui/icons-material/Construction";
import EuroIcon from "@mui/icons-material/Euro";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";

type FormData = {
  name: string;
  domain: string;
  industry: string;
  currency: string;
  country: string;
  employees_count: string;
  is_vat_registered: boolean;
};

export default function OrganizationForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      is_vat_registered: false,
    },
  });

  const { submit } = useSubmit();

  const onSubmit = async (data: FormData) => {
    const res = await submit("organizations", data);

    if (res) {
      redirect(`/${res.data.domain}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* Name */}
      <TextField
        label="اسم المؤسسة"
        variant="standard"
        {...register("name", { required: "اسم المؤسسة مطلوب" })}
        error={!!errors.name}
        helperText={errors.name?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CorporateFareIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Domain */}
      <TextField
        label="النطاق"
        variant="standard"
        {...register("domain", {
          required: "النطاق مطلوب",
          pattern: {
            value: /^[a-zA-Z]+$/,
            message: "يجب أن يحتوي النطاق على حروف إنجليزية فقط",
          },
        })}
        error={!!errors.domain}
        helperText={errors.domain?.message}
        slotProps={{
          input: {
            dir: "ltr",
            startAdornment: (
              <InputAdornment position="start">
                https://app.musadiqa.com/
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <ShareIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Industry Select */}
      <TextField
        select
        label="مجال العمل"
        variant="standard"
        defaultValue=""
        {...register("industry", { required: "الصناعة مطلوبة" })}
        error={!!errors.industry}
        helperText={errors.industry?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <ConstructionIcon />
              </InputAdornment>
            ),
          },
        }}
      >
        <MenuItem disabled value="">
          اختر مجال عمل المؤسسة
        </MenuItem>
        {industries.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>

      {/* Currency Select with flag */}
      <TextField
        select
        label="العملة"
        variant="standard"
        defaultValue=""
        {...register("currency", { required: "العملة مطلوبة" })}
        error={!!errors.currency}
        helperText={errors.currency?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EuroIcon />
              </InputAdornment>
            ),
          },
        }}
      >
        <MenuItem disabled value="">
          اختر العملة
        </MenuItem>
        {currencies.map(({ label, value, flag }, index) => (
          <MenuItem key={index} value={value}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Image
                src={flag}
                alt={label}
                width={24}
                height={16}
                style={{ borderRadius: 2 }}
                loading="lazy"
              />
              <Typography>{label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </TextField>

      {/* Country Select with flag */}
      <TextField
        select
        label="الدولة"
        variant="standard"
        defaultValue=""
        {...register("country", { required: "الدولة مطلوبة" })}
        error={!!errors.country}
        helperText={errors.country?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LanguageIcon />
              </InputAdornment>
            ),
          },
        }}
      >
        <MenuItem disabled value="">
          اختر الدولة
        </MenuItem>
        {countries.map(({ label, value, flag }) => (
          <MenuItem key={value} value={value}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Image
                src={flag}
                alt={label}
                width={24}
                height={16}
                style={{ borderRadius: 2 }}
                loading="lazy"
              />
              <Typography>{label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </TextField>

      {/* Employees Count Select */}
      <TextField
        select
        label="عدد الموظفين"
        variant="standard"
        defaultValue=""
        {...register("employees_count", { required: "عدد الموظفين مطلوب" })}
        error={!!errors.employees_count}
        helperText={errors.employees_count?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PeopleIcon />
              </InputAdornment>
            ),
          },
        }}
      >
        <MenuItem disabled value="">
          اختر عدد الموظفين
        </MenuItem>
        {employeesRange.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>

      {/* VAT Registered Checkbox */}
      <FormControlLabel
        control={
          <Controller
            name="is_vat_registered"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} />
            )}
          />
        }
        label="هل أنت مسجل ضريبيًا؟"
      />

      <Box></Box>

      <Box className="md:col-span-2 flex justify-center">
        <Button
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingPosition="start"
          endIcon={<AddIcon />}
          size="large"
        >
          إضافة المؤسسة
        </Button>
      </Box>
    </Box>
  );
}
