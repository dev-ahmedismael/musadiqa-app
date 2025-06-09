"use client";

import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import CostCenterForm, { CostCenterData } from "@/forms/costcenter";
import { show } from "@/services/api";
import { normalizeFormData } from "@/utils/normalizeFormData";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function EditCostCenter() {
  const params = useParams();

  const [data, setData] = useState<undefined | CostCenterData>(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;
      try {
        const result = await show("cost-centers", params.id as string);
        setData(result.data.data as CostCenterData);
      } catch (error) {
        console.error("Failed to fetch tax rate", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <CreatePageLayout title="تعديل مركز التكلفة">
      <CostCenterForm
        defaultValues={data && normalizeFormData(data)}
        id={params.id as string}
      />
    </CreatePageLayout>
  );
}
