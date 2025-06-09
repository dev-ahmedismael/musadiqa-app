"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Button, FormControl } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useSubmit } from "@/hooks/useSubmit";
import { useUpdateSubmit } from "@/hooks/useUpdateSubmit";
import React from "react";

const schema = z.object({
  name: z.string(),
});

export type CostCenterData = z.infer<typeof schema>;

type Props = {
  id?: string;
  defaultValues?: Partial<CostCenterData>;
};

export default function CostCenterForm({ defaultValues, id }: Props) {
  const { submit } = useSubmit();
  const { updateSubmit } = useUpdateSubmit();

  const onSubmit = async (data: CostCenterData) => {
    if (defaultValues) {
      await updateSubmit("cost-centers", id as string, data);
    } else {
      await submit("cost-centers", data);
      reset();
    }
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CostCenterData>({
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
      <FormControl error={!!errors.name}>
        <Controller
          control={control}
          name="name"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="الاسم"
              helperText={errors.name?.message}
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
