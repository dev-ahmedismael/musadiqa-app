"use client";

import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchIcon from "@mui/icons-material/Search";

const schema = z.object({
  search: z.string(),
});

type SearchFormData = z.infer<typeof schema>;

interface SearchProps {
  onSearch: (value: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.search);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      gap={1}
    >
      <TextField
        label="بحث"
        size="small"
        {...register("search")}
        error={!!errors.search}
        className="w-full"
      />
      <Button variant="outlined" size="small" type="submit" color="primary">
        <SearchIcon />
      </Button>
    </Box>
  );
}
