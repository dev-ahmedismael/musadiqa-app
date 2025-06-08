"use client";

import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import TaxForm, { TaxFormData } from "@/forms/tax";
import { show } from "@/services/api";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function EditBranch() {
  const params = useParams();

  const [data, setData] = useState<undefined | TaxFormData>(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;
      try {
        const result = await show("tax-rates", params.id as string);
        setData(result.data.data as TaxFormData);
      } catch (error) {
        console.error("Failed to fetch tax rate", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <CreatePageLayout title="تعديل الضريبة">
      <TaxForm defaultValues={data} id={params.id as string} />
    </CreatePageLayout>
  );
}
