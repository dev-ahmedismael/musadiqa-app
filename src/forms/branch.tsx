"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useSubmit } from "@/hooks/useSubmit";
import { useUpdateSubmit } from "@/hooks/useUpdateSubmit";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const schema = z.object({
  name_ar: z.string(),
  name_en: z.string(),
  phone: z.string(),
  commercial_number: z.string(),
  building_number: z.string(),
  street: z.string(),
  district: z.string(),
  city: z.string(),
  postal_code: z.string(),
});

export type BranchFormData = z.infer<typeof schema>;

type Props = {
  id?: string;
  defaultValues?: Partial<BranchFormData>;
};

export default function BranchForm({ defaultValues, id }: Props) {
  const { submit } = useSubmit();
  const { updateSubmit } = useUpdateSubmit();

  const onSubmit = async (data: BranchFormData) => {
    if (defaultValues) {
      await updateSubmit("branches", id as string, data);
    } else {
      await submit("branches", data);
      reset();
    }
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BranchFormData>({
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

      <FormControl error={!!errors.phone}>
        <Controller
          control={control}
          name="phone"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="رقم الجوال"
              helperText={errors.phone?.message}
            />
          )}
        />
      </FormControl>

      <FormControl error={!!errors.commercial_number}>
        <Controller
          control={control}
          name="commercial_number"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="رقم السجل التجاري"
              helperText={errors.commercial_number?.message}
            />
          )}
        />
      </FormControl>

      <Box className="md:col-span-2">
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">العنوان (إختياري)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <FormControl error={!!errors.building_number}>
                <Controller
                  control={control}
                  name="building_number"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="رقم المبنى"
                      helperText={errors.building_number?.message}
                    />
                  )}
                />
              </FormControl>

              <FormControl error={!!errors.street}>
                <Controller
                  control={control}
                  name="street"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="الشارع"
                      helperText={errors.street?.message}
                    />
                  )}
                />
              </FormControl>

              <FormControl error={!!errors.district}>
                <Controller
                  control={control}
                  name="district"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="الحي"
                      helperText={errors.district?.message}
                    />
                  )}
                />
              </FormControl>

              <FormControl error={!!errors.city}>
                <Controller
                  control={control}
                  name="city"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="المدينة"
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </FormControl>

              <FormControl error={!!errors.postal_code}>
                <Controller
                  control={control}
                  name="postal_code"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="الرمز البريدي"
                      helperText={errors.postal_code?.message}
                    />
                  )}
                />
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

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
