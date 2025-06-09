"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { taxTypeOptions } from "@/data/taxes.data";
import { useSubmit } from "@/hooks/useSubmit";
import { useUpdateSubmit } from "@/hooks/useUpdateSubmit";
import React from "react";

const schema = z.object({
  name_ar: z.string(),
  name_en: z.string(),
  tax_type: z.string().nonempty("هذا الحقل مطلوب."),
  tax_rate: z.string().nonempty("هذا الحقل مطلوب."),
  description: z.string().optional(),
});

export type TaxFormData = z.infer<typeof schema>;

type Props = {
  id?: string;
  defaultValues?: Partial<TaxFormData>;
};

export default function TaxForm({ defaultValues, id }: Props) {
  const { submit } = useSubmit();
  const { updateSubmit } = useUpdateSubmit();

  const onSubmit = async (data: TaxFormData) => {
    if (defaultValues) {
      await updateSubmit("tax-rates", id as string, data);
    } else {
      await submit("tax-rates", data);
      reset();
    }
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TaxFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 md:grid-cols-2 gap-7"
    >
      <FormControl error={!!errors.name_ar}>
        <Controller
          control={control}
          name="name_ar"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="الاسم باللغة العربية"
              helperText={errors.name_ar?.message}
            />
          )}
        />
      </FormControl>

      <FormControl error={!!errors.name_en}>
        <Controller
          control={control}
          name="name_en"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="الاسم باللغة الإنجليزية"
              helperText={errors.name_en?.message}
            />
          )}
        />
      </FormControl>

      <FormControl error={!!errors.tax_type}>
        <InputLabel shrink>نوع الضريبة</InputLabel>
        <Controller
          name="tax_type"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select {...field} displayEmpty label="نوع الضريبة">
              <MenuItem value="" disabled>
                اختر نوع الضريبة
              </MenuItem>
              {taxTypeOptions.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.tax_type?.message}</FormHelperText>
      </FormControl>

      <FormControl error={!!errors.tax_rate}>
        <Controller
          control={control}
          defaultValue={""}
          name="tax_rate"
          render={({ field }) => (
            <TextField
              {...field}
              label="نسبة الضريبة"
              helperText={errors.tax_rate?.message}
            />
          )}
        />
      </FormControl>

      <FormControl error={!!errors.description} className="md:col-span-2">
        <Controller
          control={control}
          defaultValue={""}
          name="description"
          render={({ field }) => (
            <TextField
              {...field}
              label="الوصف"
              multiline
              minRows={3}
              helperText={errors.description?.message}
            />
          )}
        />
      </FormControl>

      <Box className="md:col-span-2" display={"flex"} justifyContent={"end"}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={<SaveAsIcon />}
          loading={isSubmitting}
          loadingPosition="start"
        >
          حفظ البيانات
        </Button>
      </Box>
    </Box>
  );
}
