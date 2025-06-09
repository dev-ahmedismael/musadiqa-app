"use client";

import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import BranchForm, { BranchFormData } from "@/forms/branch";
import { show } from "@/services/api";
import { normalizeFormData } from "@/utils/normalizeFormData";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function EditBranch() {
  const params = useParams();

  const [data, setData] = useState<undefined | BranchFormData>(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;
      try {
        const result = await show("branches", params.id as string);
        setData(result.data.data as BranchFormData);
      } catch (error) {
        console.error("Failed to fetch tax rate", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <CreatePageLayout title="تعديل الفرع">
      <BranchForm
        defaultValues={data && normalizeFormData(data)}
        id={params.id as string}
      />
    </CreatePageLayout>
  );
}
